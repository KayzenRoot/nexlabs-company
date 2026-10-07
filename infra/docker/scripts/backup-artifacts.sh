#!/usr/bin/env sh
set -eu

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"
[ -f .env ] || { echo "Missing .env" >&2; exit 1; }
. ./.env

VOLUME="${ARTIFACT_VOLUME_NAME:-nexlabs_company_artifacts}"
docker volume inspect "$VOLUME" >/dev/null 2>&1 || { echo "Artifact volume does not exist: $VOLUME" >&2; exit 2; }

BACKUP_DIR="${NEXLABS_BACKUP_DIR:-./runtime/backups}"
mkdir -p "$BACKUP_DIR"
ABS_BACKUP="$(CDPATH= cd -- "$BACKUP_DIR" && pwd)"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
NAME="artifacts_$STAMP.tar.gz"

docker run --rm -v "$VOLUME:/data:ro" -v "$ABS_BACKUP:/backup" "alpine:${UTILITY_IMAGE_TAG:-3.21}" sh -ec "tar -czf /backup/$NAME -C /data ."
[ -s "$BACKUP_DIR/$NAME" ] || { echo "Artifact backup was empty or missing." >&2; exit 3; }

echo "$BACKUP_DIR/$NAME"
