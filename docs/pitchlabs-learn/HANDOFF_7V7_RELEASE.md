# Handoff: 7v7 formations release (state at 2026-10-13)

Read this first in a new session. **Launched 2026-10-13 on Chris's go:** the article is `content/articles/7v7-soccer-formations.mdx` (locked), `TOOLS_PUBLISHED` is `true`, and the work is on branch `7v7-formations-launch` for Chris to merge. Where this note says draft, false or uncommitted below, that is the pre-launch state.

## What exists
- **Article draft:** `content/articles/_DRAFT-7v7-formations-2-3-1-vs-3-2-1.mdx` (about 2,200 words). Publishes by renaming to `7v7-soccer-formations.mdx`.
- **Formation builder:** `components/ShapeBoard.js` (shape board + rotation planner), data in `lib/shapes7v7.js`, pitch in `lib/pitch7v7.js` (vendored from the app), rotation maths in `lib/rotation.js`.
- **Tools section:** `/tools` index, `app/tools/7v7-formation-builder`, six more tools via `lib/tools.js` + `app/tools/[slug]`, cards in `components/ToolCards.js`, embed route `app/embed/shape-board`.
- **Release switch:** `TOOLS_PUBLISHED` in `lib/site.js` is `false`. While false, production 404s every tool route and hides the nav link, sitemap entries, topic card and the gated links in three older articles (`components/IfPublished.js`). `next dev` shows everything.
- **Diagrams / social image:** `npm run build:diagrams` writes the SVGs; the OG jpg was rasterised in a browser and needs redoing if diagrams change.
- **Checks:** `npm run check:pitch`, `npm run verify:diagrams`, `npm run lint`, `npm run build`. All pass.
- **App repo:** branch `learn-tools-admin-block`, uncommitted: Tools-section page views and embed hosts on `/admin/learn`. Typecheck and 487 tests pass.
- **GA4:** `embed_host` custom dimension created on property 529416672. `tool` and `action` already existed.

## Waiting on Chris
Answered 2026-10-13 by interview: the 2-3-1 weak spot (his words), the 3-2-1 diamond, no view on the 3-1-2, the choice rule, the quick test, all position numbers, the Animate CTA. Other federations re-read at source (COACHING_FRAMEWORK.md).
1. Read the paragraphs changed on 2026-10-13, the ShapeBoard captions and the six tool-page blurbs.
2. Confirm which "highest-level teams" the multi-shape line in "How to choose" refers to.
3. Publish: set the article date, rename it, set `TOOLS_PUBLISHED = true`, commit both repos.

## Not done
- Real-phone and Android test of the reworked board.
- Lighthouse run.
- Built 2026-10-13 on Chris's call: draw arrows (arrows only), out-of-possession toggle (same shape, narrower and deeper, his words), zones overlay. Declined by Chris: frames; names and bench on the pitch.

- Tools sweep 2026-10-13 (all seven tools): no tool changes height when a state is selected or cleared (`components/StateStack.js` plus invisible sizers), measured at 1280 and 375px; Clear / Start again is always present and disabled when there is nothing to clear; phone gutters, 40px tap targets and an 11px text floor; how-to copy in `lib/tools.js` made true at both sizes (the wheels become chips under 560px, so ring wording only shows on wide screens). axe clean on every tool page at both widths; lint and build pass. Known trade-off: the couldn't-or-didn't result box reserves about 625px on a phone, so it scrolls into view when an answer lands.

## Where the detail lives
- Sources and evidence: `COACHING_FRAMEWORK.md`, "7v7 formations guide" sections.
- Go-live checklist: `PUBLISHING_CALENDAR.md`, "Queue: 7v7 formations pillar + formation builder".
- Tool design notes: `SHAPE_BOARD_DEEP_DIVE.md`.
