#!/usr/bin/env node
/**
 * Builds the article's static formation diagrams (SVG) and its social/OG image (PNG) from the same data the
 * Shape board draws: lib/shapes7v7.js (shapes) and lib/pitch7v7.js (PitchLabs' 7v7 field). Run: npm run build:diagrams
 *
 * Output (public/images/articles/):
 *   7v7-formation-231.svg, 7v7-formation-321.svg, 7v7-formation-312.svg, 7v7-formations-og.svg, 7v7-formations-og.png
 * The OG PNG is rasterised from the SVG in a browser canvas (1200 x 630), not by this script.
 * Diagrams show role letters, not position numbers: the numbers are an unconfirmed convention (see shapes7v7.js).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const load = (file) => readFileSync(resolve(root, file), 'utf8').replace(/^export /gm, '')
const { FIELD, GEOMETRY: G, SKINS } = new Function(`${load('lib/pitch7v7.js')}\nreturn { FIELD, GEOMETRY, SKINS }`)()
const { SHAPES } = new Function(`${load('lib/shapes7v7.js')}\nreturn { SHAPES }`)()
const skin = SKINS.pitchlabs
const out = resolve(root, 'public/images/articles')
mkdirSync(out, { recursive: true })

const PAD = 18
// A header band above the pitch carries the label, so nothing sits on the markings.
const VB = { x: -PAD, y: -70, w: FIELD.w + PAD * 2, h: FIELD.h + 70 + 34 }
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"

function pitch() {
  const line = `stroke="${skin.line}" stroke-width="2" fill="none"`
  const r = (b) => `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" ${line}/>`
  return [
    `<rect x="${VB.x}" y="${VB.y}" width="${VB.w}" height="${VB.h}" fill="${skin.exterior}"/>`,
    `<rect x="0" y="0" width="${FIELD.w}" height="${FIELD.h}" fill="${skin.fill}"/>`,
    `<rect x="0" y="0" width="${FIELD.w}" height="${FIELD.h}" ${line}/>`,
    `<line x1="0" y1="${FIELD.h / 2}" x2="${FIELD.w}" y2="${FIELD.h / 2}" ${line}/>`,
    `<circle cx="${G.circle.cx}" cy="${G.circle.cy}" r="${G.circle.r}" ${line}/>`,
    r(G.penTop), r(G.penBottom), r(G.areaTop), r(G.areaBottom),
    `<path d="${G.arcTop}" ${line}/>`, `<path d="${G.arcBottom}" ${line}/>`,
    `<rect x="${G.goalTop.x}" y="${G.goalTop.y}" width="${G.goalTop.w}" height="${G.goalTop.h}" fill="rgba(255,255,255,0.28)" stroke="${skin.line}" stroke-width="2"/>`,
    `<rect x="${G.goalBottom.x}" y="${G.goalBottom.y}" width="${G.goalBottom.w}" height="${G.goalBottom.h}" fill="rgba(255,255,255,0.28)" stroke="${skin.line}" stroke-width="2"/>`,
  ].join('\n')
}

// The static diagrams stretch each shape up the pitch (distance from our goal x 1.55) so it fills the field,
// where the board keeps it compact to leave room for an opponent. Shapes and relative positions are unchanged.
const SPREAD = 1.55
const GOAL_LINE_Y = 566
const spreadY = (y) => Math.max(40, GOAL_LINE_Y - (GOAL_LINE_Y - y) * SPREAD)

function players(shape) {
  const parts = []
  // A row line connects the players on it in left-to-right order, so a staggered back three is drawn as the
  // shallow V it is, not as a flat line floating between them.
  const rowLines = shape.rows
    .map((ids) => {
      const pts = ids
        .map((id) => ({ x: shape.p[id].x, y: spreadY(shape.p[id].y) }))
        .sort((a, b) => a.x - b.x)
        .map((p) => `${p.x},${p.y}`)
        .join(' ')
      return `<polyline points="${pts}" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-dasharray="5 5"/>`
    })
    .join('\n')
  parts.push(rowLines)
  const dot = (x, y, label, keeper) =>
    `<g><circle cx="${x}" cy="${y}" r="20" fill="#4fae6a" stroke="${keeper ? '#ffffff' : 'rgba(0,0,0,0.4)'}" stroke-width="${keeper ? 2.5 : 2}"/>` +
    `<text x="${x}" y="${y + 5}" text-anchor="middle" font-family="${MONO}" font-size="14" font-weight="700" fill="#08130d">${esc(label)}</text></g>`
  parts.push(dot(shape.gk.x, shape.gk.y, 'GK', true))
  Object.values(shape.p).forEach((p) => {
    if (!p.hide) parts.push(dot(p.x, spreadY(p.y), p.role, false))
  })
  return parts.join('\n')
}

function label(shape) {
  return (
    `<text x="0" y="-24" font-family="${MONO}" font-size="40" font-weight="700" fill="${skin.line}">${esc(shape.notation)}</text>` +
    `<text x="${FIELD.w}" y="-28" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="17" fill="rgba(238,242,248,0.8)">${esc(shape.keeperNotation)} (keeper counted)</text>`
  )
}

function mark() {
  return `<text x="${FIELD.w - 8}" y="${FIELD.h + 22}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="rgba(238,242,248,0.7)">PitchLabs 7v7 field</text>`
}

function diagram(key) {
  const shape = SHAPES[key]
  const title = `${shape.notation} formation on a 7v7 pitch`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}" width="${VB.w}" height="${VB.h}" role="img" aria-label="${esc(title)}">
<title>${esc(title)}</title>
${pitch()}
${players(shape)}
${label(shape)}
${mark()}
</svg>
`
}

for (const key of ['231', '321', '312']) {
  writeFileSync(resolve(out, `7v7-formation-${key}.svg`), diagram(key))
}

// Social / OG image: 1200 x 630.
function og() {
  const s = 0.8
  const place = (key, x) =>
    `<g transform="translate(${x} ${60}) scale(${s}) translate(${-VB.x} ${-VB.y})">\n${pitch()}\n${players(SHAPES[key])}\n${label(SHAPES[key])}\n</g>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<rect width="1200" height="630" fill="#0d1117"/>
<text x="60" y="190" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="2" fill="#8fd6a3">PITCHLABS LEARN</text>
<text x="60" y="290" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#ededed">7v7</text>
<text x="60" y="370" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#ededed">formations</text>
<text x="60" y="450" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="#4fae6a">2-3-1 or 3-2-1?</text>
<text x="60" y="510" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#b0b0b0">What U.S. Soccer and the FA publish,</text>
<text x="60" y="545" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#b0b0b0">and what nobody has measured.</text>
${place('231', 470)}
${place('321', 830)}
</svg>
`
}
const ogSvg = resolve(out, '7v7-formations-og.svg')
writeFileSync(ogSvg, og())

console.log('build-shape-diagrams: wrote 3 diagrams and the OG svg. The OG png is rendered from the SVG in a browser (see docs).')
