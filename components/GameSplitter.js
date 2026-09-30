'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * Small-sided game splitter for "Small-Sided Games for Young Players". Enter how many players turned up and
 * it lays out the ways to split them: everyone in one game, then two, three or four games at once.
 *
 * Plain arithmetic, not a research claim: players are paired up and the pairs spread as evenly as possible
 * across the games, so every game is an even NvN and an odd player out becomes one neutral (in the smallest
 * game) rather than a neutral in every game. "Players per ball" is the group size divided by the number of
 * games. The row flagged "Start here" is the most games that keeps every game between 3v3 and
 * 4v4 (6–9 players), matching the article's "start small for touches".
 *
 * Reuses the .step-tool panel so the site's interactive tools read as one family. GA4: `tool_use` with
 * tool "game_splitter" and the player count, once the count has settled.
 */

const MIN_PLAYERS = 4
const MAX_PLAYERS = 20 // a realistic team session at these ages; bigger groups usually mean more than one coach anyway
const DEFAULT_PLAYERS = 12
const MAX_GAMES = 4

function gameLabel(size) {
  const side = Math.floor(size / 2)
  return size % 2 ? `${side}v${side} + neutral` : `${side}v${side}`
}

function splitInto(players, games) {
  // Spread pairs rather than players, so 14 in two games is 4v4 + 3v3, not two 3v3s with a neutral each.
  const pairs = Math.floor(players / 2)
  const base = Math.floor(pairs / games)
  const extra = pairs % games
  const sizes = [...Array(extra).fill(2 * (base + 1)), ...Array(games - extra).fill(2 * base)]
  if (players % 2) sizes[sizes.length - 1] += 1 // the odd player out is a neutral in the smallest game
  // Group identical games so it reads "2 × 4v4" rather than "4v4, 4v4".
  const counts = new Map()
  sizes.forEach((s) => counts.set(s, (counts.get(s) || 0) + 1))
  const parts = [...counts.entries()].map(([s, c]) => (c > 1 ? `${c} × ${gameLabel(s)}` : gameLabel(s)))
  return {
    games,
    sizes,
    label: parts.join(', '),
    perBall: players / games,
    hasNeutral: players % 2 === 1,
    inRange: sizes.every((s) => s >= 6 && s <= 9),
  }
}

function options(players) {
  const rows = [splitInto(players, 1)]
  for (let g = 2; g <= MAX_GAMES; g++) {
    if (Math.floor(players / 2) < 2 * g) break // every game needs at least 2v2
    rows.push(splitInto(players, g))
  }
  const ranged = rows.filter((r) => r.inRange)
  const start = ranged.length ? ranged[ranged.length - 1].games : null
  return rows.map((r) => ({ ...r, start: r.games === start }))
}

const formatPerBall = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1))

export function GameSplitter() {
  const [players, setPlayers] = useState(DEFAULT_PLAYERS)
  // What's in the box while typing. Kept separate so typing "16" doesn't clamp the "1" to 4 on the way.
  const [draft, setDraft] = useState(String(DEFAULT_PLAYERS))
  const lastTracked = useRef(DEFAULT_PLAYERS)

  // Track the count once it has settled rather than on every tap of the stepper.
  useEffect(() => {
    if (players === lastTracked.current) return
    const t = setTimeout(() => {
      lastTracked.current = players
      trackEvent('tool_use', { tool: 'game_splitter', action: 'players', players })
    }, 1200)
    return () => clearTimeout(t)
  }, [players])

  const clamp = (n) => Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, n))
  const step = (d) => {
    const n = clamp(players + d)
    setPlayers(n)
    setDraft(String(n))
  }
  const commitDraft = () => {
    const n = parseInt(draft, 10)
    const next = Number.isNaN(n) ? players : clamp(n)
    setPlayers(next)
    setDraft(String(next))
  }
  const rows = options(players)
  const anyNeutral = rows.some((r) => r.hasNeutral)

  return (
    <div className="step-tool gs-tool">
      <div className="step-tool-header">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · Split your group
        </span>
        <p className="step-tool-desc">
          Enter how many players turned up. The arithmetic is the easy part: which split fits depends on what the activity
          is for.
        </p>
      </div>

      <div className="gs-input">
        <label htmlFor="gs-players" className="gs-input-label">
          Players
        </label>
        <div className="gs-stepper">
          <button type="button" className="gs-step" aria-label="One fewer player" onClick={() => step(-1)} disabled={players <= MIN_PLAYERS}>
            −
          </button>
          <input
            id="gs-players"
            className="gs-number"
            type="number"
            inputMode="numeric"
            min={MIN_PLAYERS}
            max={MAX_PLAYERS}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value)
              const n = parseInt(e.target.value, 10)
              if (n >= MIN_PLAYERS && n <= MAX_PLAYERS) setPlayers(n)
            }}
            onBlur={commitDraft}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitDraft()
            }}
          />
          <button type="button" className="gs-step" aria-label="One more player" onClick={() => step(1)} disabled={players >= MAX_PLAYERS}>
            +
          </button>
        </div>
      </div>

      <div className="gs-table" aria-live="polite">
        <div className="gs-head" aria-hidden="true">
          <span>Games</span>
          <span>Split</span>
          <span>Per ball</span>
          <span>Goals</span>
        </div>
        {rows.map((r) => (
          <div key={r.games} className={`gs-row${r.start ? ' gs-row-start' : ''}`}>
            <span className="gs-games">{r.games === 1 ? 'One game' : `${r.games} games`}</span>
            <span className="gs-split">
              {r.label}
              {r.start && <span className="gs-tag">Start here</span>}
            </span>
            <span className="gs-per-ball">
              <span className="gs-cell-label">Per ball </span>
              {formatPerBall(r.perBall)} players
            </span>
            <span className="gs-goals">
              <span className="gs-cell-label">Goals </span>
              {r.games * 2}
            </span>
          </div>
        ))}
      </div>

      <div className="gs-notes">
        {rows[0].start ? (
          <p>At this size, one game is already 3v3 or 4v4.</p>
        ) : rows.some((r) => r.start) ? (
          <p>
            <strong>Start here</strong> is the most games that keeps every game between 3v3 and 4v4. If the decision you
            want needs more players, like switching play, move up a row.
          </p>
        ) : (
          <p>
            {rows.length === 1
              ? 'At this size, one game is the split.'
              : 'At this size the games can’t all be 3v3 or 4v4. Splitting still means more of the ball each; one game keeps a bit more room for decisions.'}
          </p>
        )}
        {anyNeutral && (
          <p>
            With an odd number, one game has a neutral who plays for whichever team has the ball. Swap who it is every few
            minutes so nobody spends the session as the spare.
          </p>
        )}
      </div>
    </div>
  )
}
