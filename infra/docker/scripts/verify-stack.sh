#!/usr/bin/env sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"

[ -f .env ] || { echo "Missing infra/docker/.env; run bootstrap.sh first." >&2; exit 1; }
[ -f secrets/local/postgres_password.txt ] || { echo "Missing postgres secret." >&2; exit 1; }

docker compose --env-file .env -f compose.yml config --quiet
docker compose --env-file .env -f compose.yml -f compose.observability.yml config --quiet

docker compose --env-file .env -f compose.yml ps postgres
docker compose --env-file .env -f compose.yml exec -T postgres sh -ec 'pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB"'

if docker compose --env-file .env -f compose.yml --profile cache ps -q redis | grep -q .; then
  docker compose --env-file .env -f compose.yml --profile cache exec -T redis redis-cli ping | grep -q PONG
fi

echo "Core local runtime verification passed."
