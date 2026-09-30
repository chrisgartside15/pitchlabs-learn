#!/usr/bin/env bash
# Builds Learn's printable PDFs from the PitchLabs app's react-pdf components (the app is read, never modified).
#
#   scripts/pdf/build.sh                  # all printables
#   scripts/pdf/build.sh tally-sheet      # just one (see render.mjs for names)
#
# Writes <name>-{letter,a4}.pdf to public/downloads/ and a 1275×1650 Letter preview PNG to
# public/images/articles/<name>-preview.png. Needs: the PitchLabs app checked out with node_modules
# installed (override its path with PITCHLABS_APP=...), and poppler's pdftoppm (brew install poppler).
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
APP="${PITCHLABS_APP:-$REPO/../App-Studio/Projects/PitchLabs}"
APP="$(cd "$APP" && pwd)"
ALL=(activity-sheet session-plan switch-of-play interaction-menu six-ways-to-step-in tally-sheet)
NAMES=("${@:-${ALL[@]}}")

[ -d "$APP/node_modules/@react-pdf/renderer" ] || { echo "PitchLabs app node_modules not found at $APP" >&2; exit 1; }
command -v pdftoppm >/dev/null || { echo "pdftoppm not found (brew install poppler)" >&2; exit 1; }

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
ln -s "$APP/node_modules" "$WORK/node_modules"
cp "$HERE/render.mjs" "$WORK/"

for name in "${NAMES[@]}"; do
  "$APP/node_modules/.bin/esbuild" "$HERE/$name.tsx" --bundle --format=esm --platform=node --jsx=automatic \
    --tsconfig="$APP/tsconfig.json" --external:@react-pdf/renderer --external:react --external:sharp \
    --log-level=warning --outfile="$WORK/$name.bundle.mjs"
  (cd "$WORK" && node render.mjs "$name" "$WORK" "$APP" "$HERE/assets")
done

# Publish: PDFs to public/downloads, and a Letter preview for each DownloadCard.
for pdf in "$WORK"/*.pdf; do
  cp "$pdf" "$REPO/public/downloads/"
  base="$(basename "$pdf" .pdf)"
  if [[ "$base" == *-letter ]]; then
    pdftoppm -png -r 150 -singlefile "$pdf" "$REPO/public/images/articles/${base%-letter}-preview"
  fi
done
echo "Done. Check the PDFs and previews, and remember the articles using them are locked."
