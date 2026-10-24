# PitchLabs social kit (carousels + reel covers)

Adopted 2026-10-22 as the house style for carousels and reel covers. Project doc: claude/social-KIT.md.

One look for every Instagram carousel and reel cover, taken from the Fundamentals carousel and the 3v3 reel covers.
You write a JSON spec; the kit draws the slides. No hand-placed coordinates, no per-post CSS.

## Make one

```
npm install                      # once: playwright + fonts
npx playwright install chromium  # once, on a new machine
node render.mjs specs/fundamentals.json
node render.mjs specs/3v3-switching-the-play.json --safe   # cover with the grid crop drawn on, for checking only
```

PNGs land in `out/`. Copy a spec, change the words, render.

## The rules

**Sizes.** Carousel 1080 × 1350 (4:5). Reel cover 1080 × 1920 (9:16).

**Grid crop.** Instagram's profile grid shows a 3:4 crop (the middle 1080 × 1440 of a cover, y 240 to 1680).
Everything on a cover sits inside that band, including the age and size line. The old Play Back cover put that line at
y 1724, which the grid cut off. `--safe` draws the band.

**Colour.** Dark only. One bright colour: Bib `#D7F25C` for accent words, rules, the CTA pill, the run arrow and zones
(at 20%). Headlines Chalk `#F3F0E6`, body `#B9C4BB`, labels `#9AA59D`. Player dots keep the app's red and blue.

**Type.** Archivo, expanded (width 125), weight 600 for headlines; normal width for body. JetBrains Mono caps,
tracked, for the series label, slide count, kickers, citations and the URL. Accent at most one phrase per slide.

**Carousel chrome (every slide, never moved).** Series label with rule top left, `n / total` top right, mark bottom
left, `SWIPE →` bottom right on slide 1, the URL on every other slide. 80px side margins.

**Carousel layouts.** Pick one per slide; one idea per slide.

| layout | use for | fields |
|---|---|---|
| `hook` | slide 1, must work alone in the feed | `title`, `sub` |
| `compare` | a research finding as proportions | `kicker`, `title`, `bars[] {label, note, share, hit}`, `empty`, `body`, `cite` |
| `statement` | one claim | `kicker?`, `title`, `body` |
| `stack` | a short sequence or model | `kicker`, `words[]` (last is lit), `body[]` |
| `cards` | two or three named tools/ideas | `title`, `cards[] {label, title, body}` |
| `signoff` | last slide, to the article | `kicker?`, `title`, `body`, `cta?` |

Text markup: `*words*` = Bib, `**words**` = white bold, `\n` = line break.

**Reel cover.** Centred: eyebrow with rules both sides (the category), the big format (`3v3`) in Bib with a soft glow,
the activity name, the pitch in perspective, then `age · size · PitchLabs`. Pitch positions are in yards
(`x` across, `y` from the far end), so a cover can be built from the activity's own setup. The run is the dotted Bib
arrow; ringed players are the ones the activity is about; zones are Bib at 20%.

## Files
- `kit.html` + `kit.css`: the renderer and all styling. Change the look here, once.
- `render.mjs`: renders a spec to PNG with Playwright. Set `CHROMIUM=/path/to/chrome` to use a specific browser.
- `specs/`: one JSON per post. The three here rebuild the Fundamentals carousel and both 3v3 covers.
- `fonts/`: Archivo and JetBrains Mono (SIL OFL), bundled so renders don't depend on Google Fonts.
