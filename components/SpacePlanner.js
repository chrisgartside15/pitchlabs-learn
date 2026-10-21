'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * Small-sided game space planner. Enter the space you've been given and how many players turned up; it splits
 * the space into one to four equal grids, says which game goes in each, and how much room every player gets.
 *
 * Plain arithmetic, not a research claim. The split of players into games is the same as GameSplitter's (pairs
 * spread evenly, an odd player out becomes one neutral in the smallest game); it's duplicated here rather than
 * imported so the locked GameSplitter stays untouched. Grids are laid out in whichever arrangement keeps each one
 * closest to 1.5 times longer than wide.
 *
 * "Match-sized" is a reference, not a target: the space per player on official youth fields, which works out at
 * about 5.5 x 8.5 yards (5 x 8 m) per player on one team when FA, German, Spanish and common US sizes are divided
 * by players per side. The bands either side of it (0.6 / 0.9 / 1.1 / 1.5) are a convenience, not from a study.
 *
 * Reuses the .step-tool panel, the GameSplitter stepper and .audit-seg. GA4: `tool_use` with tool
 * "space_planner", once the inputs have settled.
 */

const MIN_PLAYERS = 4
const MAX_PLAYERS = 24
const DEFAULT_PLAYERS = 12
const MAX_GAMES = 4
const YD_TO_M = 0.9144
const SQ_YD_TO_M2 = YD_TO_M * YD_TO_M

// Yards and metres per player on one team, width then length, for a match-sized field.
const MATCH = { yd: { w: 5.5, l: 8.5 }, m: { w: 5, l: 8 } }

// Common spaces, from the FA's recommended youth sizes (yards). Metric versions are converted and rounded.
// Half a 7v7 field is the same size as a 5v5 field, so it's left out.
const PRESETS = [
  { id: '5v5', label: '5v5 field', w: 30, l: 40 },
  { id: '7v7', label: '7v7 field', w: 40, l: 60 },
  { id: 'half9', label: 'Half a 9v9 field', w: 40, l: 50 },
  { id: '9v9', label: '9v9 field', w: 50, l: 80 },
]

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1))
const roundHalf = (n) => Math.round(n * 2) / 2

function gameLabel(size) {
  const side = Math.floor(size / 2)
  return size % 2 ? `${side}v${side} + neutral` : `${side}v${side}`
}

function splitPlayers(players, games) {
  const pairs = Math.floor(players / 2)
  const base = Math.floor(pairs / games)
  const extra = pairs % games
  const sizes = [...Array(extra).fill(2 * (base + 1)), ...Array(games - extra).fill(2 * base)]
  if (players % 2) sizes[sizes.length - 1] += 1
  return sizes
}

function arrange(w, l, games) {
  // Every way to cut the space into `games` equal grids; keep the one whose grids are closest to 1.5:1.
  let best = null
  for (let across = 1; across <= games; across++) {
    if (games % across) continue
    const along = games / across
    const gw = w / across
    const gl = l / along
    const ratio = Math.max(gw, gl) / Math.min(gw, gl)
    const score = Math.abs(ratio - 1.5)
    if (!best || score < best.score) best = { across, along, gw, gl, score }
  }
  return best
}

function feelOf(ratio) {
  if (ratio < 0.6) return { label: 'Much tighter than match-sized', short: 'Much tighter' }
  if (ratio < 0.9) return { label: 'Tighter than match-sized', short: 'Tighter' }
  if (ratio <= 1.1) return { label: 'About match-sized', short: 'About match-sized' }
  if (ratio <= 1.5) return { label: 'More open than match-sized', short: 'More open' }
  return { label: 'Much more open than match-sized', short: 'Much more open' }
}

const FEEL_NOTES = {
  'Much tighter': 'Very little time on the ball. Works for pressure games if players can already keep it; otherwise expect a lot of turnovers.',
  Tighter: 'More pressure on the first touch and quicker decisions.',
  'About match-sized': 'Roughly the room players get in a match at this format.',
  'More open': 'More running, more time on the ball, more room in transition.',
  'Much more open': 'Lots of running and time on the ball. Fewer players may end up near it, so think about more players per game or a smaller grid.',
}

function plan(players, w, l, unit) {
  const rows = []
  for (let games = 1; games <= MAX_GAMES; games++) {
    if (Math.floor(players / 2) < 2 * games) break // every game needs at least 2v2
    const sizes = splitPlayers(players, games)
    const grid = arrange(w, l, games)
    const area = grid.gw * grid.gl
    const perGame = sizes.map((size) => {
      const side = Math.floor(size / 2)
      const ref = (MATCH[unit].w * side * MATCH[unit].l * side) / (2 * side)
      const perPlayer = area / size
      return { size, label: gameLabel(size), perPlayer, feel: feelOf(perPlayer / ref) }
    })
    // Group identical games so it reads "2 × 4v4".
    const groups = []
    perGame.forEach((g) => {
      const found = groups.find((x) => x.size === g.size)
      if (found) found.count++
      else groups.push({ ...g, count: 1 })
    })
    rows.push({ games, sizes, grid, groups, allThreeAside: sizes.every((s) => s >= 6) })
  }
  return rows
}

function toM2(area, unit) {
  return unit === 'yd' ? area * SQ_YD_TO_M2 : area
}

function SpaceDrawing({ w, l, unit, row }) {
  // Length runs across, width down, drawn to scale. Grid lines show how the space is cut.
  const VW = 600
  const pad = 34
  const fw = VW - pad * 2
  const fh = Math.max(80, (fw * w) / l)
  const VH = fh + pad * 2
  const { across, along } = row.grid
  const cw = fw / along
  const ch = fh / across
  const cells = []
  row.sizes.forEach((size, i) => {
    const col = i % along
    const r = Math.floor(i / along)
    cells.push({ x: pad + col * cw, y: pad + r * ch, label: gameLabel(size) })
  })
  return (
    <svg
      className="fs-field"
      viewBox={`0 0 ${VW} ${VH}`}
      role="img"
      aria-label={`Your space, ${fmt(w)} by ${fmt(l)} ${unit === 'yd' ? 'yards' : 'metres'}, cut into ${row.games} ${row.games === 1 ? 'game' : 'grids'}`}
    >
      <rect x={pad} y={pad} width={fw} height={fh} className="fs-turf" rx="4" />
      {Array.from({ length: along - 1 }, (_, i) => (
        <line key={`v${i}`} x1={pad + (i + 1) * cw} y1={pad} x2={pad + (i + 1) * cw} y2={pad + fh} className="fs-cut" />
      ))}
      {Array.from({ length: across - 1 }, (_, i) => (
        <line key={`h${i}`} x1={pad} y1={pad + (i + 1) * ch} x2={pad + fw} y2={pad + (i + 1) * ch} className="fs-cut" />
      ))}
      {cells.map((c, i) => (
        <text key={i} x={c.x + cw / 2} y={c.y + ch / 2} className="fs-cell" textAnchor="middle" dominantBaseline="middle">
          {c.label}
        </text>
      ))}
      <text x={pad + fw / 2} y={pad - 12} className="fs-dim" textAnchor="middle">
        {fmt(l)} {unit} long
      </text>
      <text x={pad + fw + 24} y={pad + fh / 2} className="fs-dim" textAnchor="middle" transform={`rotate(90 ${pad + fw + 24} ${pad + fh / 2})`}>
        {fmt(w)} {unit} wide
      </text>
    </svg>
  )
}

function Seg({ value, options, onChange, label }) {
  return (
    <div className="audit-seg" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" className={`audit-seg-btn${value === o.id ? ' active' : ''}`} aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

function NumberBox({ id, value, onChange, min, max, label }) {
  // Kept as a draft string while typing so "4" on the way to "45" isn't clamped. When the value changes from
  // outside (a unit switch, a preset), the draft follows in the same render rather than in an effect afterwards,
  // which would show the old number for a frame.
  const [draft, setDraft] = useState(String(value))
  const [synced, setSynced] = useState(value)
  if (value !== synced) {
    setSynced(value)
    if (parseFloat(draft) !== value) setDraft(String(value))
  }
  const commit = () => {
    const n = parseFloat(draft)
    const next = Number.isNaN(n) ? value : Math.max(min, Math.min(max, n))
    onChange(next)
    setDraft(String(next))
  }
  return (
    <input
      id={id}
      aria-label={label}
      className="gs-number fs-number"
      type="number"
      inputMode="decimal"
      autoComplete="off"
      min={min}
      max={max}
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value)
        const n = parseFloat(e.target.value)
        if (n >= min && n <= max) onChange(n)
      }}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit()
      }}
    />
  )
}

export function SpacePlanner() {
  const [unit, setUnit] = useState('yd')
  const [space, setSpace] = useState({ w: 40, l: 60 })
  const [players, setPlayers] = useState(DEFAULT_PLAYERS)
  const [picked, setPicked] = useState(null) // null = the default row below
  const lastTracked = useRef('')

  const key = `${unit}|${space.w}x${space.l}|${players}|${picked}`
  useEffect(() => {
    if (key === lastTracked.current) return
    const t = setTimeout(() => {
      if (lastTracked.current) trackEvent('tool_use', { tool: 'space_planner', unit, players, games: picked })
      lastTracked.current = key
    }, 1200)
    return () => clearTimeout(t)
  }, [key, unit, players, picked])

  const switchUnit = (u) => {
    if (u === unit) return
    const k = u === 'm' ? YD_TO_M : 1 / YD_TO_M
    setSpace((s) => ({ w: Math.round(s.w * k), l: Math.round(s.l * k) }))
    setUnit(u)
  }

  const applyPreset = (p) => {
    const k = unit === 'm' ? YD_TO_M : 1
    setSpace({ w: Math.round(p.w * k), l: Math.round(p.l * k) })
  }

  const changePlayers = (n) => {
    setPlayers(Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, Math.round(n))))
    setPicked(null)
  }

  // Treat whichever side is longer as the length, whatever order it was typed in.
  const w = Math.min(space.w, space.l)
  const l = Math.max(space.w, space.l)
  const rows = plan(players, w, l, unit)
  // Default: the most games that keeps every game at 3v3 or bigger, else one game.
  const fallback = [...rows].reverse().find((r) => r.allThreeAside)?.games || 1
  const selectedGames = rows.some((r) => r.games === picked) ? picked : fallback
  const selected = rows.find((r) => r.games === selectedGames)
  const maxSpace = unit === 'yd' ? 130 : 120
  const sq = unit === 'yd' ? 'sq yd' : 'm²'

  return (
    <div className="step-tool fs-tool">
      <div className="step-tool-header">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · Plan your space
        </span>
        <p className="step-tool-desc">
          Enter the space you&rsquo;ve got and how many players turned up. See how to cut it into one to four games, and how
          much room each player gets compared with a match at that format.
        </p>
      </div>

      <div className="fs-controls">
        <div className="fs-control fs-space">
          <label htmlFor="sp-w" className="gs-input-label">
            Your space
          </label>
          <div className="fs-space-inputs">
            <NumberBox id="sp-w" label={`Width in ${unit}`} value={space.w} onChange={(v) => setSpace((s) => ({ ...s, w: v }))} min={5} max={maxSpace} />
            <span aria-hidden="true">x</span>
            <NumberBox id="sp-l" label={`Length in ${unit}`} value={space.l} onChange={(v) => setSpace((s) => ({ ...s, l: v }))} min={5} max={maxSpace} />
            <Seg
              label="Units"
              value={unit}
              onChange={switchUnit}
              options={[
                { id: 'yd', label: 'Yd' },
                { id: 'm', label: 'M' },
              ]}
            />
          </div>
        </div>

        <div className="gs-input fs-control">
          <label htmlFor="sp-players" className="gs-input-label">
            Players
          </label>
          <div className="gs-stepper">
            <button type="button" className="gs-step" aria-label="One fewer player" onClick={() => changePlayers(players - 1)} disabled={players <= MIN_PLAYERS}>
              −
            </button>
            <NumberBox id="sp-players" label="Players" value={players} onChange={changePlayers} min={MIN_PLAYERS} max={MAX_PLAYERS} />
            <button type="button" className="gs-step" aria-label="One more player" onClick={() => changePlayers(players + 1)} disabled={players >= MAX_PLAYERS}>
              +
            </button>
          </div>
        </div>
      </div>

      <div className="fs-presets" role="group" aria-label="Common spaces">
        <span className="fs-presets-label">Or start from</span>
        {PRESETS.map((p) => (
          <button key={p.id} type="button" className="step-tool-chip" onClick={() => applyPreset(p)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="gs-table sp-table" aria-live="polite">
        <div className="gs-head sp-head" aria-hidden="true">
          <span>Games</span>
          <span>Each grid</span>
          <span>Room per player</span>
        </div>
        {rows.map((r) => (
          <button
            key={r.games}
            type="button"
            className={`sp-row${r.games === selectedGames ? ' sp-row-on' : ''}`}
            aria-pressed={r.games === selectedGames}
            aria-label={`${r.games === 1 ? 'One game' : `${r.games} games`}: ${r.groups
              .map((g) => (g.count > 1 ? `${g.count} × ${g.label}` : g.label))
              .join(', ')}, ${r.groups.map((g) => `${Math.round(g.perPlayer)} ${sq} per player, ${g.feel.short.toLowerCase()}`).join('; ')}`}
            onClick={() => setPicked(r.games)}
          >
            <span className="sp-games">
              {r.games === 1 ? 'One game' : `${r.games} games`}
              <span className="sp-split">{r.groups.map((g) => (g.count > 1 ? `${g.count} × ${g.label}` : g.label)).join(', ')}</span>
            </span>
            <span className="sp-grid">
              {fmt(roundHalf(Math.min(r.grid.gw, r.grid.gl)))} x {fmt(roundHalf(Math.max(r.grid.gw, r.grid.gl)))} {unit}
            </span>
            <span className="sp-room">
              {r.groups.map((g) => (
                <span key={g.size} className="sp-room-line">
                  {r.groups.length > 1 && <span className="sp-room-for">{g.label}: </span>}
                  {Math.round(g.perPlayer)} {sq} · <span className={`sp-feel sp-feel-${g.feel.short.replace(/\s+/g, '-').toLowerCase()}`}>{g.feel.short}</span>
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fs-result">
          <SpaceDrawing w={w} l={l} unit={unit} row={selected} />
          {selected.groups.map((g) => (
            <p key={g.size} className="fs-verdict">
              <strong>
                {selected.groups.length > 1 ? `${g.label}: ` : ''}
                {g.feel.label}.
              </strong>{' '}
              {FEEL_NOTES[g.feel.short]} Each player gets about {Math.round(g.perPlayer)} {sq}
              {unit === 'yd' ? ` (${Math.round(toM2(g.perPlayer, unit))} m²)` : ''}.
            </p>
          ))}
        </div>
      )}

      <div className="gs-notes">
        <p>
          &ldquo;Match-sized&rdquo; means about the room each player gets on an official youth field at that format. It&rsquo;s a
          reference point, not a target: a tighter or more open game is often exactly what you want. Counts every player,
          goalkeepers included.
        </p>
      </div>
    </div>
  )
}
