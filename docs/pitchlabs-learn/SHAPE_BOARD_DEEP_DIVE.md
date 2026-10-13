# Shape board: what it could be (deep dive, 2026-10-12)

Status: options, not a plan. Nothing here is built beyond the current `components/ShapeBoard.js`. Written for Chris's call.

## What exists today
`components/ShapeBoard.js` in Learn: draggable 7v7 shapes (diamond, 2-3-1, 3-2-1), pass the ball, passing lanes, opponent, central channel, build-out line, and the 3-2-1 goal-kick routine from `FORMATION_1-2-3-1_NOTES.md`. It draws its own pitch on a 400 x 600 canvas with no link to the PitchLabs app.

## What PitchLabs already has (read in `../app`, 2026-10-12)

| Asset | Where | What it gives the board |
|---|---|---|
| 7v7 field spec | `lib/fieldDefinitions.ts` (`'7v7'`) | 60 x 40 yd, penalty box 24 x 12, goal area 8 x 4, centre circle r 8, goal 6 yd wide. |
| Build-out rule | `lib/buildOut7v7.ts` (42 lines, pure) | Line sits midway between the penalty area's inner edge and halfway. Same rule as the board's idea, different numbers. |
| Pitch skins | `lib/pitchSkins.ts` | `classic` (striped grass) and `pitchlabs` (flat slate navy `#1e3248`, lines `rgba(238,242,248,.94)`, exterior `#131820`). Literal hex on purpose so exports survive. |
| Real object renders | `public/assets/` | `Ball_Render_2.webp`, `Goal_Render_2.webp`, `Mini-Goal_Render_2.webp`, `Cone_Render_2.png`. |
| Player markers | `components/objects/PlayerObject.tsx` | Numbered circles and triangles, colour-aware label contrast. Coach and referee markers exist. |
| Animate engine | `lib/animation/objectInterpolation.ts`, `timeline.ts`, `frameStateHelpers.ts` | Pure functions: tween objects by id between frames, build a timeline, resolve playback state. Data model is `Frame[]` with per-frame canvas state, titles and coaching notes. |
| Export | `lib/animation/videoExport.ts`, PNG export (Free), PDF (Pro) | MP4 from frames; PNG is available on the free plan. |
| Brand tokens | `lib/design-tokens.ts` | Lime `#A4D65E` primary, slate surfaces. Learn already uses its own green; the app's lime is the product look. |

## Findings that change the board

1. **The board's pitch is not PitchLabs' pitch.** I drew a penalty box 180 x 62 units and a centre circle r 42 on a 400 x 600 canvas (10 units per yard). The app's 7v7 spec is 240 x 120 and r 80, and its goal is 60 units wide. The build-out line I placed at y = 416 would be y = 390 by the app's own rule (midway between y 480 and 300). A coach who clicks through to the Builder would see a different pitch. Fix is mechanical: draw from the app's spec.
2. **The board's build-out line is the only one that is defensible** because the app and U.S. Soccer-linked league documents use the midpoint, but the 2017 U.S. Soccer article says 14 yards. Keep the label "distance varies by league".
3. **Cross-repo coupling.** Learn is Next 14 / JS and the app is Next 16 / TS. The existing contract (CLAUDE.md couplings) is "Learn reads two app files read-only for PDFs". For the board, vendor the 42-line `buildOut7v7` logic and the 7v7 dimensions into Learn with a header comment, not an import. Do not make Learn depend on app internals at build time.
4. **Plan gating shapes the funnel.** Free: 5 graphics, PNG export only. Animate and PDF are Pro/Founder. So the board can honestly say "export this as an image free, animate it in PitchLabs".

## What it could be (ranked)

### A. A free standalone "7v7 formation builder" (recommended first)
The board promoted from article widget to its own page, also embedded in the pillar article.
- **Why:** "7v7 formation builder / lineup tool" is what the commercial blogs sell. A free tool is linkable and shareable in a way an article is not, and it sits one click from PitchLabs.
- **Build:** real PitchLabs 7v7 geometry, the `pitchlabs` skin as default with `classic` as a toggle, the ball and goal renders, numbered markers, Download PNG, and share-by-URL (state in the hash, so no backend and no schema).
- **Risk:** low. Pure client code in Learn, no app changes.

### B. A rotation planner (the genuinely new thing)
Enter squad size (7 to 12) and number of periods; get a position-by-position rotation so everyone plays every line, keeper included, and nobody sits out more than their share.
- **Why:** the FA's 7v7 page suggests at least 50% of game time for each player, Football Australia's club template asks for equal time and rotation through every position including keeper for U6-U11, and U.S. Soccer says try all positions. Coaches do this by hand on the sideline. It is arithmetic like `GameSplitter`, not a research claim.
- **Build:** a second tab on the board; a printable lineup card is the natural output.
- **Risk:** a printable card through Learn's existing PDF pipeline needs a new react-pdf component in the app, which is an app change to approve.

### C. Scenes played by the real Animate engine
Replace hand-rolled tweens with `Frame[]` data run through the app's `interpolateObjects` and `buildTimeline`, so the goal-kick routine is authored once and plays identically in the article and in the product.
- **Why:** it makes the article a real demonstration of Animate, which the formations queue already intends, and the same frames can be exported as MP4 for social.
- **Risk:** medium. Needs a small shared frame schema, and each scene needs Chris's own routine in his words. Only the first step of the goal kick is captured today.

### D. Matchup lab (two shapes, lanes)
Both teams editable, lanes drawn between. Fun, but the evidence base is nil (no 2-3-1 vs 3-2-1 study exists) and it invites claims the site cannot back. Keep the opponent overlay as it is; do not build this out.

## Recommended sequence
1. **Now, no approvals:** geometry from the app's 7v7 spec, `pitchlabs` skin, ball and goal renders, Download PNG, URL state. Then move to its own page (needs the cluster and file rename Chris signs off).
2. **Then:** rotation planner as a second tab. Print it via the browser first; a PDF card later if it earns it.
3. **Later, with approval:** the Animate-driven scenes and an "Open in PitchLabs" deep link that preloads a 7v7 field with the shape (needs an app route, so ask first).

## Guardrails
- Nothing on the board is a research claim. Shapes are illustrative. Chris's opinions stay labelled.
- Lane "blocked" is geometry on the reader's own positions.
- Anything that implies a shape wins, develops players better or is recommended by a federation stays out; the evidence log says none of that is established.
- Brand claims in CTAs (Animate frame-by-frame playback) need checking against the shipped product before publishing.

## Progress log
- **2026-10-12, step 1 built** (in `components/ShapeBoard.js`, `lib/pitch7v7.js`, `public/images/shape-board/ball.webp`): pitch redrawn from the app's 7v7 spec (vendored, not imported); build-out line at the app's midpoint rule (y 390 of 600, was 416); `pitchlabs` skin by default with a `classic` grass toggle; the app's ball render (`Ball_Render_2.webp`, copied); Save image (PNG, 2x); Copy link (arrangement in the URL hash, restored on load). Checked in a browser pane: shapes, drag, overlays, goal-kick, PNG export (872 x 1296, content present), hash restore. Not checked: touch devices, Safari, clipboard in a real user gesture (blocked in the embedded pane, fallback message shows), the standalone page (step 1b, needs the rename and cluster sign-off).
- The app's goal render is a side-on net lattice, not useful top-down, so goals are drawn as plain rectangles from the spec.
- **2026-10-12, later:** added the 3-1-2 (the only shape the one published 7-a-side comparison I found, González-Rodenas et al. 2025, tested against the 2-3-1; no opinion captioned, since Chris has none recorded). Added the rotation planner as a second mode (`lib/rotation.js`): squad 7 to 14, halves/thirds/quarters, keeper rotates or not, optional names, period shown on the pitch, copy as text. Dropped-on players now ease apart (30-unit gap). Standalone page at `/tools/7v7-formation-builder`, `noindex`, not in the sitemap, not linked, held for Chris's sign-off together with the article rename. Not done: embed snippet, app deep link, drift guard, accessibility audit, real-device touch test.
