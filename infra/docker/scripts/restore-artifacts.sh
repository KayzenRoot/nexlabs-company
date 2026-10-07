#!/usr/bin/env sh
set -eu

[ "$#" -eq 1 ] || { echo "Usage: $0 path/to/artifacts.tar.gz" >&2; exit 2; }
[ "${NEXLABS_RESTORE_CONFIRM:-}" = "I_UNDERSTAND_THIS_IS_DESTRUCTIVE" ] || {
  echo "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE" >&2
  exit 3
}

ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"
ARCHIVE="$1"
[ -f "$ARCHIVE" ] || { echo "Archive not found: $ARCHIVE" >&2; exit 4; }
. ./.env

VOLUME="${ARTIFACT_VOLUME_NAME:-nexlabs_company_artifacts}"
docker volume inspect "$VOLUME" >/dev/null 2>&1 || docker volume create "$VOLUME" >/dev/null
ABS_DIR="$(CDPATH= cd -- "$(dirname -- "$ARCHIVE")" && pwd)"
NAME="$(basename -- "$ARCHIVE")"

docker run --rm -v "$VOLUME:/data" -v "$ABS_DIR:/backup:ro" "alpine:${UTILITY_IMAGE_TAG:-3.21}" sh -ec "find /data -mindepth 1 -maxdepth 1 -exec rm -rf {} +; tar -xzf /backup/$NAME -C /data"

echo "Artifact restore completed from $ARCHIVE"
