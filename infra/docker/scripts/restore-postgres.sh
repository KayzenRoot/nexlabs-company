#!/usr/bin/env sh
set -eu

[ "$#" -eq 1 ] || { echo "Usage: $0 path/to/postgres.dump" >&2; exit 2; }
[ "${NEXLABS_RESTORE_CONFIRM:-}" = "I_UNDERSTAND_THIS_IS_DESTRUCTIVE" ] || {
  echo "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE" >&2
  exit 3
}

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"
DUMP="$1"
[ -f "$DUMP" ] || { echo "Dump not found: $DUMP" >&2; exit 4; }

CID="$(docker compose --env-file .env -f compose.yml ps -q postgres)"
[ -n "$CID" ] || { echo "Postgres container is not running." >&2; exit 5; }

TMP="/tmp/nexlabs-restore.dump"
docker cp "$DUMP" "$CID:$TMP"
docker compose --env-file .env -f compose.yml exec -T postgres sh -ec 'pg_restore --clean --if-exists --no-owner -U "$POSTGRES_USER" -d "$POSTGRES_DB" /tmp/nexlabs-restore.dump'
docker compose --env-file .env -f compose.yml exec -T postgres rm -f "$TMP"

echo "PostgreSQL restore completed from $DUMP"
