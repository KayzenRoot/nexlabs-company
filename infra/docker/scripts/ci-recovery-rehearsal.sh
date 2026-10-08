#!/usr/bin/env bash
# Only ephemeral, isolated GitHub-hosted CI fixtures. Never run on user or production infrastructure.
set -euo pipefail
if [[ "${GITHUB_ACTIONS:-}" != "true" ||
      ! "${GITHUB_RUN_ID:-}" =~ ^[0-9]+$ ||
      ! "${GITHUB_RUN_ATTEMPT:-}" =~ ^[0-9]+$ ]]; then
  echo "Refusing restore rehearsal outside disposable GitHub Actions fixture." >&2
  exit 40
fi
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"
if [[ -e .env || -e secrets/local/postgres_password.txt ]]; then
  echo "Refusing to overwrite a pre-existing local environment or secret." >&2
  exit 41
fi

# Every resource has a unique name and data is synthetic. Existing names are a hard stop.
suffix="ci${GITHUB_RUN_ID}x${GITHUB_RUN_ATTEMPT}"
project="nexlabs-${suffix}"
pg_volume="nexlabs_${suffix}_pg"
artifact_volume="nexlabs_${suffix}_art"
data_net="nexlabs_${suffix}_data"
obs_net="nexlabs_${suffix}_obs"
if docker volume inspect "$pg_volume" >/dev/null 2>&1 || docker volume inspect "$artifact_volume" >/dev/null 2>&1; then
  echo "Refusing collision with an existing Docker volume." >&2
  exit 42
fi
cp .env.example .env
sed -i \
  -e "s|^COMPOSE_PROJECT_NAME=.*|COMPOSE_PROJECT_NAME=$project|" \
  -e "s|^POSTGRES_VOLUME_NAME=.*|POSTGRES_VOLUME_NAME=$pg_volume|" \
  -e "s|^ARTIFACT_VOLUME_NAME=.*|ARTIFACT_VOLUME_NAME=$artifact_volume|" \
  -e "s|^DATA_NETWORK_NAME=.*|DATA_NETWORK_NAME=$data_net|" \
  -e "s|^OBSERVABILITY_NETWORK_NAME=.*|OBSERVABILITY_NETWORK_NAME=$obs_net|" \
  -e "s|^NEXLABS_BACKUP_DIR=.*|NEXLABS_BACKUP_DIR=./runtime/$suffix/backups|" .env
mkdir -p secrets/local "runtime/$suffix/backups"
printf 'synthetic-ci-only-postgres-fixture\n' > secrets/local/postgres_password.txt
chmod 600 secrets/local/postgres_password.txt
compose=(docker compose --env-file .env -f compose.yml)
cleanup() {
  # Never use down --volumes; CI runner is ephemeral and no real volumes are touched.
  "${compose[@]}" down --remove-orphans >/dev/null 2>&1 || true
}
trap cleanup EXIT
"${compose[@]}" up -d --wait postgres

db() {
  "${compose[@]}" exec -T postgres sh -ec 'psql -v ON_ERROR_STOP=1 -At -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "$1"' sh "$1"
}
db "CREATE TABLE public.nxl_ci_recovery_canary (id int PRIMARY KEY, note text NOT NULL); INSERT INTO public.nxl_ci_recovery_canary VALUES (1, 'before-backup');" >/dev/null
dump="$(sh scripts/backup-postgres.sh)"
test -s "$dump"
db "UPDATE public.nxl_ci_recovery_canary SET note='after-backup'; INSERT INTO public.nxl_ci_recovery_canary VALUES (2, 'newer');" >/dev/null

# Fail closed before any data mutation.
if env -u NEXLABS_RESTORE_CONFIRM sh scripts/restore-postgres.sh "$dump" >/dev/null 2>&1; then
  echo "Postgres restore bypassed confirmation." >&2; exit 43
fi
if NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE sh scripts/restore-postgres.sh "./runtime/$suffix/backups/missing.dump" >/dev/null 2>&1; then
  echo "Postgres restore accepted a nonexistent dump." >&2; exit 44
fi
printf 'not a postgres dump\n' > "./runtime/$suffix/backups/invalid.dump"
if NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE sh scripts/restore-postgres.sh "./runtime/$suffix/backups/invalid.dump" >/dev/null 2>&1; then
  echo "Postgres restore accepted a corrupt dump." >&2; exit 45
fi
[[ "$(db 'SELECT note FROM public.nxl_ci_recovery_canary WHERE id=1;')" == "after-backup" ]] || {
  echo "Failed restore guard modified database." >&2; exit 46;
}
NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE sh scripts/restore-postgres.sh "$dump"
[[ "$(db 'SELECT note FROM public.nxl_ci_recovery_canary WHERE id=1;')" == "before-backup" ]] || {
  echo "Postgres backup did not recover original row." >&2; exit 47;
}
[[ "$(db 'SELECT COUNT(*) FROM public.nxl_ci_recovery_canary;')" == "1" ]] || {
  echo "Postgres restore did not discard post-backup mutation." >&2; exit 48;
}
echo "PASS: isolated transactional PostgreSQL backup/restore and fail-closed negative cases"

docker volume create "$artifact_volume" >/dev/null
docker run --rm -v "$artifact_volume:/data" alpine:3.21 sh -ec 'printf "evidence-original-ci-fixture\n" > /data/receipt.txt'
original_hash="$(docker run --rm -v "$artifact_volume:/data:ro" alpine:3.21 sha256sum /data/receipt.txt | cut -d' ' -f1)"
archive="$(sh scripts/backup-artifacts.sh)"
test -s "$archive"
docker run --rm -v "$artifact_volume:/data" alpine:3.21 sh -ec 'printf "changed-during-ci\n" > /data/receipt.txt'

if env -u NEXLABS_RESTORE_CONFIRM sh scripts/restore-artifacts.sh "$archive" >/dev/null 2>&1; then
  echo "Artifact restore bypassed confirmation." >&2; exit 49
fi
if NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE sh scripts/restore-artifacts.sh "./runtime/$suffix/backups/missing.tar.gz" >/dev/null 2>&1; then
  echo "Artifact restore accepted missing archive." >&2; exit 50
fi
printf 'invalid tar fixture\n' > "./runtime/$suffix/backups/invalid.tar.gz"
if NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE sh scripts/restore-artifacts.sh "./runtime/$suffix/backups/invalid.tar.gz" >/dev/null 2>&1; then
  echo "Artifact restore accepted corrupt tar." >&2; exit 51
fi
[[ "$(docker run --rm -v "$artifact_volume:/data:ro" alpine:3.21 cat /data/receipt.txt)" == "changed-during-ci" ]] || {
  echo "Corrupt archive erased data before validation." >&2; exit 52;
}
NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE sh scripts/restore-artifacts.sh "$archive"
restored_hash="$(docker run --rm -v "$artifact_volume:/data:ro" alpine:3.21 sha256sum /data/receipt.txt | cut -d' ' -f1)"
[[ "$restored_hash" == "$original_hash" ]] || { echo "Artifact restore hash mismatch." >&2; exit 53; }
echo "PASS: isolated artifact backup/restore, SHA-256 integrity and fail-closed negative cases"
