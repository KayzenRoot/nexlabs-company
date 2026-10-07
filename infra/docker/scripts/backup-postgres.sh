#!/usr/bin/env sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"
[ -f .env ] || { echo "Missing .env" >&2; exit 1; }
. ./.env

BACKUP_DIR="${NEXLABS_BACKUP_DIR:-./runtime/backups}"
mkdir -p "$BACKUP_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
OUT="$BACKUP_DIR/postgres_$STAMP.dump"

docker compose --env-file .env -f compose.yml exec -T postgres sh -ec 'pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc' > "$OUT"
[ -s "$OUT" ] || { rm -f "$OUT"; echo "Backup was empty." >&2; exit 1; }

echo "$OUT"
