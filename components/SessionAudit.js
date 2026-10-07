'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'

/**
 * Session audit for "The Fundamentals of Soccer Coaching": a coach lists the activities from their
 * last session, tags what each one mostly asked players to do (repeat a movement, make decisions,
 * look before the ball arrives), and sees the split next to one study's average. Reuses the STEP
 * tool's panel so the site's interactive tools read as one family; each activity is one compact line
 * with a Repeat / Decide / Look switch, and the three types are explained once in a key above.
 *
 * The comparison is Ford et al. (2010), cited via Cushion, Ford & Williams (2012): 70 youth sessions,
 * about 64% "training form" (isolated drills) and 36% "playing form" (small-sided/conditioned games).
 * That study didn't split game time into "decide" and "look", so both count as game time here, and
 * the tool says so. Messages are framed as observations, not verdicts — a drill-heavy session can be
 * exactly right, e.g. for a skill players can't do yet.
 *
 * Entries are kept in this browser only (localStorage, wrapped in try/catch) so a coach can come back
 * to them; nothing is sent anywhere. GA4: `tool_use` with tool "session_audit" once per page view when
 * a result first appears, and on reset.
 */

const TYPES = {
  repeat: {
    label: 'Repeat a movement',
    short: 'Repeat',
    hint: 'A movement with no real choice in it, like a passing pattern.',
    color: 'var(--fg-subtle)',
  },
  decide: {
    label: 'Make decisions',
    short: 'Decide',
    hint: 'Players face a real choice, like a small-sided or conditioned game.',
    color: 'var(--brand)',
  },
  look: {
    label: 'Look before the ball arrives',
    short: 'Look',
    hint: 'Built so players have to check around them before they receive.',
    color: 'var(--brand-text)',
  },
}
const STUDY = { drills: 64, games: 36 }
const STORAGE_KEY = 'pl-session-audit-v1'
const MAX_ROWS = 8
const blankRow = () => ({ name: '', minutes: '', type: null })

function loadRows() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if (Array.isArray(parsed) && parsed.length) return parsed.slice(0, MAX_ROWS)
  } catch {}
  return null
}

function saveRows(rows) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
  } catch {}
}

export function SessionAudit() {
  const [rows, setRows] = useState([blankRow(), blankRow(), blankRow()])
  const [loaded, setLoaded] = useState(false)
  const tracked = useRef(false)

  // Load after mount so the server-rendered markup and the first client render match.
  useEffect(() => {
    const saved = loadRows()
    if (saved) setRows(saved)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) saveRows(rows)
  }, [rows, loaded])

  const update = (i, patch) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)))
  const remove = (i) => setRows((rs) => (rs.length > 1 ? rs.filter((_, j) => j !== i) : [blankRow()]))
  const add = () => setRows((rs) => (rs.length < MAX_ROWS ? [...rs, blankRow()] : rs))
  const reset = () => {
    setRows([blankRow(), blankRow(), blankRow()])
    tracked.current = false
    trackEvent('tool_use', { tool: 'session_audit', action: 'reset' })
  }

  const counted = rows
    .map((r) => ({ ...r, mins: Math.max(0, Math.min(180, Number(r.minutes) || 0)) }))
    .filter((r) => r.type && r.mins > 0)
  const total = counted.reduce((n, r) => n + r.mins, 0)
  const by = (type) => counted.filter((r) => r.type === type).reduce((n, r) => n + r.mins, 0)
  const mins = { repeat: by('repeat'), decide: by('decide'), look: by('look') }
  const pct = (m) => (total ? Math.round((m / total) * 100) : 0)
  const repeatPct = pct(mins.repeat)
  const hasResult = total > 0

  useEffect(() => {
    if (hasResult && !tracked.current) {
      tracked.current = true
      trackEvent('tool_use', { tool: 'session_audit', action: 'result_shown' })
    }
  }, [hasResult])

  const notes = []
  if (hasResult) {
    if (repeatPct >= 60) {
      notes.push(
        <>
          Most of your time went on repeating movements, close to the pattern in the study. That can be exactly right,
          especially for a skill players can&apos;t do yet (<Link href="/articles/teach-it-or-let-the-game-teach-it">Teach It or Let the Game Teach It?</Link> covers
          when). If you&apos;d like more decisions in it, changing one drill with{' '}
          <Link href="/articles/why-your-practice-feels-like-chaos">STEP</Link> is one way to start.
        </>
      )
    } else if (repeatPct <= 40) {
      notes.push(
        <>
          Most of your time was in activities with decisions in them, more than the sessions in the study. If players
          kept breaking down on the technique itself,{' '}
          <Link href="/articles/teach-it-or-let-the-game-teach-it">Teach It or Let the Game Teach It?</Link> covers when a
          short focused block can help.
        </>
      )
    } else {
      notes.push(<>A fairly even mix of repetition and decisions: more game time than the sessions in the study averaged.</>)
    }
    if (mins.look === 0) {
      notes.push(
        <>
          Nothing here was built around looking before the ball arrives. The{' '}
          <Link href="/articles/scanning-and-receiving">scanning piece</Link> has a few conditions that add it without
          changing the whole game.
        </>
      )
    }
  }

  return (
    <div className="step-tool session-audit">
      <div className="step-tool-header">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · Audit your last session
        </span>
        <p className="step-tool-desc">
          List the activities from your last session and roughly how long each ran, then tag what each one mostly asked
          players to do. Your entries stay in this browser.
        </p>
        <dl className="audit-key">
          {Object.entries(TYPES).map(([key, t]) => (
            <div key={key} className="audit-key-item">
              <dt>
                <span className="audit-swatch" style={{ background: t.color }} aria-hidden="true" />
                {t.short}
              </dt>
              <dd>{t.hint}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="audit-table" role="group" aria-label="Activities from your last session">
        <div className="audit-head" aria-hidden="true">
          <span />
          <span>Activity</span>
          <span>Min</span>
          <span>Mostly asked players to</span>
          <span />
        </div>
        {rows.map((r, i) => (
          <div key={i} className="audit-line">
            <span className="audit-num" aria-hidden="true">
              {i + 1}
            </span>
            <input
              className="audit-input audit-input-name"
              type="text"
              value={r.name}
              maxLength={60}
              placeholder="e.g. Passing gates"
              aria-label={`Activity ${i + 1} name`}
              onChange={(e) => update(i, { name: e.target.value })}
            />
            <input
              className="audit-input audit-input-mins"
              type="number"
              inputMode="numeric"
              min="0"
              max="180"
              value={r.minutes}
              placeholder="10"
              aria-label={`Activity ${i + 1} minutes`}
              onChange={(e) => update(i, { minutes: e.target.value })}
            />
            <div className="audit-seg" role="group" aria-label={`What activity ${i + 1} mostly asked players to do`}>
              {Object.entries(TYPES).map(([key, t]) => (
                <button
                  key={key}
                  type="button"
                  className={`audit-seg-btn${r.type === key ? ' active' : ''}`}
                  aria-pressed={r.type === key}
                  aria-label={t.label}
                  title={t.label}
                  onClick={() => update(i, { type: r.type === key ? null : key })}
                >
                  {t.short}
                </button>
              ))}
            </div>
            <button type="button" className="audit-remove" onClick={() => remove(i)} aria-label={`Remove activity ${i + 1}`}>
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="audit-actions">
        {rows.length < MAX_ROWS && (
          <button type="button" className="audit-link-button" onClick={add}>
            + Add an activity
          </button>
        )}
        <button type="button" className="audit-link-button audit-link-quiet" onClick={reset}>
          Start again
        </button>
      </div>

      <div className="audit-result" aria-live="polite">
        {hasResult ? (
          <>
            <div className="audit-compare">
              <div className="audit-compare-row">
                <p className="audit-compare-label">
                  Your session <span>{total} min</span>
                </p>
                <div className="audit-bar" aria-hidden="true">
                  {Object.entries(TYPES).map(([key, t]) =>
                    mins[key] > 0 ? (
                      <span
                        key={key}
                        style={{ flexGrow: mins[key], background: t.color, color: key === 'look' ? 'var(--surface-0)' : '#ffffff' }}
                      >
                        {pct(mins[key]) >= 14 ? `${t.short} ${pct(mins[key])}%` : ''}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
              <div className="audit-compare-row">
                <p className="audit-compare-label">
                  Study average <span>70 sessions</span>
                </p>
                <div className="audit-bar" aria-hidden="true">
                  <span style={{ flexGrow: STUDY.drills, background: 'var(--fg-subtle)' }}>Drills {STUDY.drills}%</span>
                  <span style={{ flexGrow: STUDY.games, background: 'var(--brand)' }}>Games {STUDY.games}%</span>
                </div>
              </div>
            </div>
            <p className="audit-summary">
              {Object.entries(TYPES)
                .map(([key, t]) => `${t.short} ${mins[key]} min (${pct(mins[key])}%)`)
                .join(' · ')}
            </p>

            {notes.map((n, i) => (
              <p key={i} className="audit-note">
                {n}
              </p>
            ))}

            <p className="audit-source">
              Study: Ford et al. (2010), cited via{' '}
              <a href="https://doi.org/10.1080/02640414.2012.721930" target="_blank" rel="noopener noreferrer">
                Cushion, Ford &amp; Williams (2012)
              </a>
              ; players aged 9, 13 and 16, data over fifteen years old. It didn&apos;t separate &ldquo;decide&rdquo; from
              &ldquo;look&rdquo;, so both count as game time here.
            </p>
          </>
        ) : (
          <p className="audit-empty">Add minutes and a tag for at least one activity to see your split.</p>
        )}
      </div>
    </div>
  )
}
