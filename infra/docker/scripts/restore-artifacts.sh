#!/usr/bin/env sh
set -eu

[ "$#" -eq 1 ] || { echo "Usage: $0 path/to/artifacts.tar.gz" >&2; exit 2; }
[ "${NEXLABS_RESTORE_CONFIRM:-}" = "I_UNDERSTAND_THIS_IS_DESTRUCTIVE" ] || {
  echo "Set NEXLABS_RESTORE_CONFIRM=I_UNDERSTAND_THIS_IS_DESTRUCTIVE" >&2
  exit 3
}
ROOT="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT"
[ -f .env ] || { echo "Missing .env" >&2; exit 4; }
ARCHIVE="$1"
[ -s "$ARCHIVE" ] || { echo "Archive missing or empty: $ARCHIVE" >&2; exit 4; }
. ./.env
VOLUME="${ARTIFACT_VOLUME_NAME:-nexlabs_company_artifacts}"
ABS_DIR="$(CDPATH= cd -- "$(dirname -- "$ARCHIVE")" && pwd)"
NAME="$(basename -- "$ARCHIVE")"

# No target volume is created until the input exists and confirmation is checked.
docker volume inspect "$VOLUME" >/dev/null 2>&1 || docker volume create "$VOLUME" >/dev/null
docker run --rm -v "$VOLUME:/data" -v "$ABS_DIR:/backup:ro" "alpine:${UTILITY_IMAGE_TAG:-3.21}" sh -ec '
  set -eu
  name="$1"
  stage="$(mktemp -d)"
  trap "rm -rf \"$stage\"" EXIT HUP INT TERM
  tar -tzf "/backup/$name" > "$stage/manifest"
  while IFS= read -r entry; do
    case "$entry" in
      /*|..|../*|*/../*|*/..)
        echo "Unsafe archive entry" >&2
        exit 7
        ;;
    esac
  done < "$stage/manifest"
  mkdir "$stage/content"
  # Extract entirely away from the target volume first.
  tar -xzf "/backup/$name" -C "$stage/content"
  # Destructive phase only after successful archive validation/extraction.
  find /data -mindepth 1 -maxdepth 1 -exec rm -rf {} +
  cp -a "$stage/content/." /data/
' sh "$NAME"

echo "Artifact restore completed from $ARCHIVE"
