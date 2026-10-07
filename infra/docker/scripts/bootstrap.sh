#!/usr/bin/env sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"

command -v docker >/dev/null 2>&1 || { echo "docker is required" >&2; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "Docker Compose v2 is required" >&2; exit 1; }

[ -f .env ] || cp .env.example .env
mkdir -p secrets/local runtime/backups

generate_secret() {
  target="$1"
  [ -f "$target" ] && return 0
  if command -v openssl >/dev/null 2>&1; then
    openssl rand -hex 32 > "$target"
  else
    docker run --rm alpine:3.21 sh -c "head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n'" > "$target"
  fi
  chmod 600 "$target" 2>/dev/null || true
}

generate_secret secrets/local/postgres_password.txt
generate_secret secrets/local/grafana_admin_password.txt

docker compose --env-file .env -f compose.yml config --quiet
docker compose --env-file .env -f compose.yml -f compose.observability.yml config --quiet

echo "NexLabs local runtime bootstrapped."
echo "Start core: docker compose --env-file .env -f compose.yml up -d postgres"
echo "Start cache: docker compose --env-file .env -f compose.yml --profile cache up -d"
echo "Start observability: docker compose --env-file .env -f compose.yml -f compose.observability.yml --profile observability up -d"
