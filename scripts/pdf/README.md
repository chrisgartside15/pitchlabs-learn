# Printable PDFs

The free printables offered through `<DownloadCard>` in the articles are built here. They reuse the main PitchLabs app's react-pdf pieces (`components/pdf/ActivityPdfDocument.tsx` for fonts, palette and styles; `lib/pdf/react/layout.ts` for densities and `renderFitted`, which steps the density down until the page fits), so they look like a PitchLabs export. The app is only read, never modified.

## Build

```bash
scripts/pdf/build.sh                # all six
scripts/pdf/build.sh tally-sheet    # just one
```

This writes `public/downloads/<file>-{letter,a4}.pdf` and a 1275×1650 Letter preview to `public/images/articles/<file>-preview.png`. It needs:

- the PitchLabs app checked out with `node_modules` installed, by default at `../App-Studio/Projects/PitchLabs` relative to this repo (override with `PITCHLABS_APP=/path/to/app`)
- poppler's `pdftoppm` for previews (`brew install poppler`)

`build.sh` bundles each `.tsx` with the app's esbuild and tsconfig (so `@/` imports resolve into the app), runs it from a temp folder whose `node_modules` points at the app's, and cleans up afterwards. Nothing from the app is copied into this repo.

Every build embeds a fresh creation date, so a rebuild shows all PDFs as changed in git even when nothing visible changed. Rebuild only the one you edited.

## What's here

| Source | Published as | Used in |
|---|---|---|
| `activity-sheet.tsx` | `pitchlabs-activity-sheet` | Chaos article, planning pillar |
| `session-plan.tsx` | `pitchlabs-session-plan` | Planning pillar |
| `switch-of-play.tsx` | `switch-of-play-to-four-goals` | Chaos article, scanning article |
| `interaction-menu.tsx` | `coaching-interaction-menu` | How Much Should You Actually Say? |
| `six-ways-to-step-in.tsx` | `six-ways-to-step-in` | How to Coach Without Stopping the Game |
| `tally-sheet.tsx` | `coaching-tally-sheet` | How to See Your Own Coaching |

`render.mjs` maps each source to its export function and file name. `assets/switch-of-play-diagram.jpg` is the Switch of Play diagram as exported from PitchLabs; the activity sheet's blank drawing box is generated in `render.mjs`.

## Rules for these sheets

- **Every article using them is locked.** Changing a sheet changes a locked page, so only do it when Chris asks for that change.
- **Anywhere a coach writes stays white.** No dark or coloured fills in write-in areas (Chris's call).
- **Wording matches the article** the sheet sits in, and any research on it names its source and sample, same as the articles.
- **Free, no email gate.** Downloads are tracked by `DownloadCard` (`resource_preview`, `resource_download`); a new sheet needs a new `resource` name, added to the table in `docs/pitchlabs-learn/PERFORMANCE_FRAMEWORK.md`.
