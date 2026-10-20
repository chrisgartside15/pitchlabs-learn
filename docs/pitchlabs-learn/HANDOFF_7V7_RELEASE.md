# Handoff: 7v7 formations release (state at 2026-10-14)

Read this first in a new session. **Released 2026-10-13 and live in production** (Learn PR #3, then PR #4; Vercel production deployment of `main` at `f8d9ed3` is READY). The article is locked. This note replaces the pre-launch version.

## What is live
- **Article:** `content/articles/7v7-soccer-formations.mdx` ("7v7 Formations: 2-3-1 or 3-2-1, and How to Choose"), Formations topic, locked.
- **Formation builder:** `components/ShapeBoard.js` (shape board + rotation planner), data in `lib/shapes7v7.js`, pitch in `lib/pitch7v7.js` (vendored from the app), rotation maths in `lib/rotation.js`. Features built on Chris's call: arrows, out-of-possession toggle, zones overlay. Declined by Chris: frames; names and bench on the pitch.
- **Tools section:** `/tools` index, `app/tools/7v7-formation-builder`, six more tools via `lib/tools.js` + `app/tools/[slug]`, cards in `components/ToolCards.js`, embed route `app/embed/shape-board` (`noindex`).
- **Release switch:** `TOOLS_PUBLISHED` in `lib/site.js` is **`true`**. Setting it to `false` hides the tool routes, nav link, sitemap entries, topic card and the gated links in three older articles (`components/IfPublished.js`).
- **Diagrams / social image:** `npm run build:diagrams` writes the SVGs; the OG jpg was rasterised in a browser and needs redoing if diagrams change.
- **Checks:** `npm run check:pitch`, `npm run verify:diagrams`, `npm run lint`, `npm run build` passed at release (run again after any change).
- **App side:** Learn Tools page views and embed hosts show on `/admin/learn` (app PR #14, live).
- **GA4:** `embed_host` custom dimension created on property 529416672. `tool` and `action` already existed.

## Still open
1. Chris reads the paragraphs changed on 2026-10-13, the ShapeBoard captions and the six tool-page blurbs (the tool-page copy was drafted by Claude; the two "version I use" attribution lines especially). The article went live on Chris's go, but this read-through is not recorded as done.
2. Confirm which "highest-level teams" the multi-shape line in "How to choose" refers to.
3. Real-phone and Android test of the reworked board; production Lighthouse run (the 85 to 95 figure was local).
4. Not built, need app changes and approval first: "Open in PitchLabs" deep link and a printable lineup card.
5. Two unpublished, unapproved drafts exist (`_DRAFT-7v7-3-2-1-goal-kick-in-possession.mdx`, `_DRAFT-why-some-kids-improve-faster-at-soccer.mdx`) plus an image, all uncommitted.

- Tools sweep 2026-10-13 (all seven tools): no tool changes height when a state is selected or cleared (`components/StateStack.js` plus invisible sizers), measured at 1280 and 375px; Clear / Start again is always present and disabled when there is nothing to clear; phone gutters, 40px tap targets and an 11px text floor; how-to copy in `lib/tools.js` made true at both sizes (the wheels become chips under 560px, so ring wording only shows on wide screens). axe clean on every tool page at both widths; lint and build pass. Known trade-off: the couldn't-or-didn't result box reserves about 625px on a phone, so it scrolls into view when an answer lands.

## Where the detail lives
- Sources and evidence: `COACHING_FRAMEWORK.md`, "7v7 formations guide" sections.
- Go-live checklist: `PUBLISHING_CALENDAR.md`, "Queue: 7v7 formations pillar + formation builder".
- Tool design notes: `SHAPE_BOARD_DEEP_DIVE.md`.
