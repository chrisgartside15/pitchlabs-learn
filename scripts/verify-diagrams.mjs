#!/usr/bin/env node
/**
 * Accuracy check for the article's static formation diagrams. For each SVG it counts the player dots, groups them
 * into lines by height, and checks them against the shape's notation (2-3-1 is 2, 3, 1 from defence to attack),
 * the role labels in lib/shapes7v7.js, left/right symmetry, that nothing overlaps, and that every dot is on the
 * pitch. Run after `npm run build:diagrams`: npm run verify:diagrams
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const load = (f) => readFileSync(resolve(root, f), 'utf8').replace(/^export /gm, '')
const { SHAPES } = new Function(`${load('lib/shapes7v7.js')}\nreturn { SHAPES }`)()
const { FIELD } = new Function(`${load('lib/pitch7v7.js')}\nreturn { FIELD }`)()

let bad = 0
const fail = (m) => {
  bad++
  console.error('  ✗', m)
}

for (const key of ['231', '321', '312']) {
  const shape = SHAPES[key]
  const svg = readFileSync(resolve(root, `public/images/articles/7v7-formation-${key}.svg`), 'utf8')
  console.log(`${shape.notation} (${key})`)
  const dots = [...svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="(\d+)"[^>]*fill="#4fae6a"[^>]*\/><text[^>]*>([^<]+)<\/text>/g)].map((m) => ({
    x: +m[1], y: +m[2], r: +m[3], label: m[4],
  }))
  if (dots.length !== 7) fail(`expected 7 dots including the keeper, found ${dots.length}`)
  const keeper = dots.filter((d) => d.label === 'GK')
  if (keeper.length !== 1) fail(`expected one GK, found ${keeper.length}`)
  const outfield = dots.filter((d) => d.label !== 'GK')

  // lines by role (a back three is deliberately staggered, so grouping by exact height would be wrong)
  const lineOf = (l) => (['D', 'CD', 'WD'].includes(l) ? 0 : ['CM', 'WM'].includes(l) ? 1 : 2)
  const counts = [0, 1, 2].map((i) => outfield.filter((d) => lineOf(d.label) === i).length)
  const want = shape.notation.split('-').map(Number)
  if (JSON.stringify(counts) !== JSON.stringify(want)) fail(`lines are ${counts.join('-')} by role, notation says ${want.join('-')}`)
  else console.log(`  ✓ lines ${counts.join('-')} match the notation`)

  // every defender is behind every midfielder, and every midfielder behind every forward
  const ys = [0, 1, 2].map((i) => outfield.filter((d) => lineOf(d.label) === i).map((d) => d.y))
  if (Math.min(...ys[0]) <= Math.max(...ys[1])) fail('a defender is level with or ahead of a midfielder')
  else if (Math.min(...ys[1]) <= Math.max(...ys[2])) fail('a midfielder is level with or ahead of a forward')
  else console.log('  ✓ defence behind midfield behind attack')

  // players on the same line sit at the same height, except the staggered back three
  ;[1, 2].forEach((i) => {
    const spread = Math.max(...ys[i]) - Math.min(...ys[i])
    if (spread > 1) fail(`line ${i === 1 ? 'midfield' : 'attack'} is not level (${spread.toFixed(1)} units apart)`)
  })

  // role labels match the data
  const expectedRoles = Object.values(shape.p).map((p) => p.role).sort().join(',')
  const gotRoles = outfield.map((d) => d.label).sort().join(',')
  if (expectedRoles !== gotRoles) fail(`roles ${gotRoles} differ from data ${expectedRoles}`)
  else console.log(`  ✓ roles ${gotRoles}`)

  // symmetric about the centre line
  const cx = FIELD.w / 2
  outfield.forEach((d) => {
    const mirror = outfield.find((o) => Math.abs(o.y - d.y) < 0.5 && Math.abs(o.x - (2 * cx - d.x)) < 0.5)
    if (!mirror) fail(`${d.label} at ${d.x},${d.y} has no mirrored partner`)
  })

  // inside the pitch, in the right order, not overlapping
  dots.forEach((d) => {
    if (d.x - d.r < 0 || d.x + d.r > FIELD.w || d.y - d.r < 0 || d.y + d.r > FIELD.h) fail(`${d.label} at ${d.x},${d.y} runs off the pitch`)
  })
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dist = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
      if (dist < dots[i].r + dots[j].r + 4) fail(`${dots[i].label} and ${dots[j].label} overlap (${dist.toFixed(1)} apart)`)
    }
  }
  if (keeper[0] && outfield.some((d) => d.y >= keeper[0].y)) fail('an outfield player is level with or behind the keeper')

  // labels present on the image
  if (!svg.includes(`>${shape.notation}</text>`)) fail('notation label missing')
  if (!svg.includes(`${shape.keeperNotation} (keeper counted)`)) fail('keeper-counted label missing or wrong')
}

console.log(bad ? `\n${bad} problem(s)` : '\nAll diagrams match their data.')
process.exit(bad ? 1 : 0)
