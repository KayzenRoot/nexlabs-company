#!/usr/bin/env sh
set -eu

[ "$#" -eq 1 ] || { echo "Usage: $0 path/to/postgres.dump" >&2; exit 2; }
[ "${NEXLABS_RESTORE_CONFIRM:-}" = "I_UNDERSTAND_THIS_IS_DESTRUCTIVE" ] || {
  echo "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE" >&2
  exit 3
}

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"
[ -f .env ] || { echo "Missing .env" >&2; exit 4; }
DUMP="$1"
[ -s "$DUMP" ] || { echo "Dump missing or empty: $DUMP" >&2; exit 4; }
CID="$(docker compose --env-file .env -f compose.yml ps -q postgres)"
[ -n "$CID" ] || { echo "Postgres container is not running." >&2; exit 5; }

# A unique remote temporary path prevents collisions across restore invocations.
TMP="$(docker compose --env-file .env -f compose.yml exec -T postgres mktemp /tmp/nexlabs-restore.XXXXXX)"
[ -n "$TMP" ] || { echo "Could not allocate temporary restore path" >&2; exit 6; }
cleanup() { docker compose --env-file .env -f compose.yml exec -T postgres rm -f "$TMP" >/dev/null 2>&1 || :; }
trap cleanup EXIT HUP INT TERM

docker cp "$DUMP" "$CID:$TMP"
# Validate archive BEFORE any transactional data mutation.
docker compose --env-file .env -f compose.yml exec -T postgres sh -ec '
  pg_restore --list "$1" >/dev/null
  pg_restore --single-transaction --exit-on-error --clean --if-exists --no-owner -U "$POSTGRES_USER" -d "$POSTGRES_DB" "$1"
' sh "$TMP"

echo "PostgreSQL restore completed from $DUMP (single transaction)"
