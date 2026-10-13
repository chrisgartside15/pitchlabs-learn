'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { trackEvent, APP_URL } from '@/lib/analytics'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { withBasePath } from '@/lib/site'
import { BUILD_OUT, FIELD, GEOMETRY, SKINS } from '@/lib/pitch7v7'
import { lineOf, planRotation } from '@/lib/rotation'
import { SHAPES } from '@/lib/shapes7v7'
import { StateStack } from '@/components/StateStack'

/**
 * Interactive 7v7 shape board: the free "7v7 Formation Builder" and the board inside "7v7 Formations: 2-3-1 or
 * 3-2-1, and How to Choose".
 *
 * Shape board
 *  - Pick a shape for each side (2-3-1, 3-2-1, 3-1-2, the 4v4 diamond; the opponent can be off). The same six
 *    outfield players glide between shapes, so the 3-2-1 visibly grows out of the diamond.
 *  - Drag any player; arrow keys nudge a focused one. Tap a player to pass them the ball. Undo steps back.
 *  - Show: the lines, the diamond, passing lanes from the ball carrier (dashed red where an opponent stands in
 *    one), and conventional position numbers in place of role letters.
 *  - Out of possession keeps the same shape, narrower and deeper (Chris, 2026-10-13: "the shapes stay the same, just
 *    naturally narrower and deeper"). How much narrower and deeper is illustrative.
 *  - Draw arrows: with the switch on, drag on the pitch to draw an arrow. Arrows only, one style. Undo removes the
 *    last one. Zones shades the thirds and marks the three vertical channels.
 *  - Both notations are always shown (2-3-1, and 1-2-3-1 with the keeper counted), with a legend for the labels.
 *  - Drawn on PitchLabs' own 7v7 field (lib/pitch7v7.js) with both build-out lines, in the PitchLabs or grass
 *    skin. Save PNG exports the pitch; Copy link puts the exact arrangement in the URL hash (no backend).
 *
 * Rotation planner
 *  - Squad size, periods, keeper rotating or fixed, optional names. lib/rotation.js spreads playing time and
 *    lines as evenly as it can; "Game" shifts who gets the shorter share so it is not the same players each week.
 *    Tap a period in the table to show it on the pitch. Copy as text, or print the table.
 *
 * Cut on 2026-10-13 as unnecessary: the "Count the keeper" switch (both notations now always show), the central
 * channel overlay, and the one-wide-player-forward preset (dragging does it).
 *
 * Content rules (CLAUDE.md): positions are illustrative, not measured, and nothing here is a research claim.
 * Captions are either what U.S. Soccer's page shows (the 4v4 1-2-1) or Chris's own opinions from his 2026-10-11
 * comments, labelled as his. Lane "blocked" marks are plain geometry on whatever the reader has dragged. Build-out
 * line distance varies by league and the board says so. Position numbers are a convention, flagged as one.
 *
 * Reuses the .step-tool panel so it reads as part of the same family as the other tools. GA4: `tool_use` with
 * tool "shape_board".
 */

const BOUNDS = { minX: 14, maxX: FIELD.w - 14, minY: 14, maxY: FIELD.h - 14 }
const LANE_CLEARANCE = 17 // how close an opponent has to stand to a lane for it to be marked blocked
const MIN_GAP = 36 // dropped players are eased this far apart, so a saved image never shows two dots stacked
const ON_KEYS = ['lines', 'diamond', 'lanes', 'nums', 'zones']
const ORDER = ['231', '321', '312', 'diamond']
const HISTORY_MAX = 30
// Out of possession: the same shape pulled in toward the middle and back toward our own goal. Illustrative amounts.
const OUT_NARROW = 0.72
const OUT_DEEP = 0.8
const MIN_ARROW = 14 // shorter drags in draw mode are treated as a slip, not an arrow

const mirror = (pt) => ({ x: pt.x, y: FIELD.h - pt.y })

// Chris's reasoning about the one matchup he has described, keyed by our shape (the opponent is the other one).
const MATCHUPS = {
  '321':
    'My reasoning, not something I have seen measured: the 2-3-1 has two wide midfielders and the 3-2-1 has two central ones, which lets the 3-2-1 control the central channel more easily. The difficulty is getting its wide defenders to support the attack.',
  '231': 'The same matchup from the other side: the 2-3-1 has the width and the 3-2-1 has the middle channel.',
}

const CAPTIONS = {
  diamond:
    'The 4v4 shape. U.S. Soccer lists it as a 1-2-1: one player back, two to the sides, one in front.',
  '231':
    'In my opinion the more balanced shape, and the easier one to perceive: three clear lines, a defending pair, wide midfielders who operate further forward, and a central midfielder with no partner to worry about.',
  '312':
    'Not one of the examples U.S. Soccer or the FA show. It is the shape the one 2025 under-19 study I found compared against the 2-3-1, and that study measured where players stood, not who won.',
  '321':
    'In my opinion it follows on from the diamond. The central defender, two central midfielders and the forward are the diamond, and two wide defenders are added to it. The cost is width: the wide defenders have to be able to support the attack.',
}

const ROLE_NAMES = {
  GK: 'goalkeeper',
  CD: 'central defender',
  WD: 'wide defender',
  D: 'defender',
  CM: 'central midfielder',
  WM: 'wide midfielder',
  F: 'forward',
  B: 'back',
  S: 'side',
}
const roleName = (r) => ROLE_NAMES[r] || 'player'

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// Distance from point p to the segment a-b.
function distToSegment(p, a, b) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len2 = dx * dx + dy * dy
  if (len2 === 0) return Math.hypot(p.x - a.x, p.y - a.y)
  const t = clamp(((p.x - a.x) * dx + (p.y - a.y) * dy) / len2, 0, 1)
  return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy))
}

// ---- URL hash state (shareable arrangement, no backend) ---------------------------------------------------
const HASH_KEY = '#board='

function encodeState(state) {
  try {
    const json = JSON.stringify(state)
    return btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  } catch {
    return ''
  }
}

function decodeState(str) {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(escape(atob(b64)))
    const s = JSON.parse(json)
    if (!s || !SHAPES[s.s]) return null
    return s
  } catch {
    return null
  }
}

function Switch({ pressed, onClick, disabled, children }) {
  return (
    <button type="button" className={`sb-switch${pressed ? ' is-on' : ''}`} aria-pressed={pressed} disabled={disabled} onClick={onClick}>
      <span className="sb-switch-dot" aria-hidden="true" />
      {children}
    </button>
  )
}

function Segmented({ label, options, value, onChange, tone, disabled }) {
  return (
    <div className={`sb-seg${tone ? ` sb-seg-${tone}` : ''}`} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={String(o.key)}
          type="button"
          className={`sb-seg-btn${value === o.key ? ' is-on' : ''}`}
          aria-pressed={value === o.key}
          disabled={disabled}
          onClick={() => onChange(o.key)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function Stepper({ label, value, onLess, onMore, lessLabel, moreLabel, canLess, canMore }) {
  return (
    <div className="sb-stepper">
      <button type="button" className="sb-btn" aria-label={lessLabel} onClick={onLess} disabled={!canLess}>
        &minus;
      </button>
      <span className="sb-stepper-n" aria-live="polite">
        {value}
        <span className="sr-only"> {label}</span>
      </span>
      <button type="button" className="sb-btn" aria-label={moreLabel} onClick={onMore} disabled={!canMore}>
        +
      </button>
    </div>
  )
}

export function ShapeBoard({ embedded = false }) {
  const [view, setView] = useState('shapes') // 'shapes' | 'rotation'
  const [shape, setShape] = useState('321')
  const [oppShape, setOppShape] = useState('231') // null = opponent off
  const [skinId, setSkinId] = useState('pitchlabs')
  const [overrides, setOverrides] = useState({}) // id -> {x, y}; ours by id, the opponent's as `o-<id>`
  const [carrier, setCarrier] = useState('p1')
  const [on, setOn] = useState({ lines: false, diamond: false, lanes: false, nums: false, zones: false })
  const [phase, setPhase] = useState('in') // 'in' | 'out' of possession, our team only
  const [arrows, setArrows] = useState([]) // [{ x1, y1, x2, y2 }]
  const [drawOn, setDrawOn] = useState(false)
  const [draft, setDraft] = useState(null) // the arrow being drawn
  const [passFlash, setPassFlash] = useState(null) // { from, to, key }
  const [dragging, setDragging] = useState(false)
  const [hinted, setHinted] = useState(false)
  const [status, setStatus] = useState('') // "Link copied" and the like, for the buttons and screen readers
  const [historyLen, setHistoryLen] = useState(0)
  // rotation planner
  const [squad, setSquad] = useState(10)
  const [periods, setPeriods] = useState(4)
  const [gkRotates, setGkRotates] = useState(true)
  const [names, setNames] = useState('')
  const [game, setGame] = useState(1)
  const [selPeriod, setSelPeriod] = useState(0)

  const svgRef = useRef(null)
  const toolRef = useRef(null)
  const dragRef = useRef(null)
  const history = useRef([])
  const drawRef = useRef(null) // { x, y } where the arrow in progress started
  const drawOnRef = useRef(false)
  const draftRef = useRef(null) // mirrors `draft`, so the arrow is committed outside a state updater
  const touched = useRef(false) // only write the URL hash once the reader has actually changed something
  const tracked = useRef({ shape: '' })

  const s = SHAPES[shape]
  const skin = SKINS[skinId]
  const isSeven = shape !== 'diamond'
  const canLines = s.rows.length > 0
  const canDiamond = Boolean(s.diamond)

  const markTouched = () => {
    touched.current = true
    setHinted(true)
  }
  const flip = (key) => {
    markTouched()
    setOn((o) => ({ ...o, [key]: !o[key] }))
  }

  // GA4: one event per kind per visit, not per drag frame.
  const track = useCallback((action, extra) => {
    trackEvent('tool_use', { tool: 'shape_board', action, ...extra })
  }, [])
  const trackOnce = (action, extra) => {
    if (tracked.current[action]) return
    tracked.current[action] = true
    track(action, extra)
  }

  useEffect(() => {
    if (tracked.current.shape === shape) return
    if (tracked.current.shape !== '') track('shape', { shape })
    tracked.current.shape = shape
  }, [shape, track])

  // When embedded on someone else's page, say which host it was loaded from (document.referrer in an iframe is the
  // embedding page). Hostname only, so the admin can see which clubs and sites use the board.
  useEffect(() => {
    if (!embedded || typeof document === 'undefined') return
    let host = ''
    try {
      host = document.referrer ? new URL(document.referrer).hostname : ''
    } catch {
      host = ''
    }
    trackEvent('tool_use', { tool: 'shape_board', action: 'embed_view', embed_host: host || '(unknown)' })
  }, [embedded])

  // ---- restore from / write to the URL hash ----------------------------------------------------------------
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.hash.startsWith(HASH_KEY)) return
    const st = decodeState(window.location.hash.slice(HASH_KEY.length))
    if (!st) return
    setShape(st.s)
    setSkinId(SKINS[st.k] ? st.k : 'pitchlabs')
    const ov = {}
    Object.entries(st.o || {}).forEach(([id, v]) => {
      if (Array.isArray(v) && v.length === 2) ov[id] = { x: clamp(+v[0], BOUNDS.minX, BOUNDS.maxX), y: clamp(+v[1], BOUNDS.minY, BOUNDS.maxY) }
    })
    setOverrides(ov)
    setCarrier(typeof st.c === 'string' ? st.c : 'p1')
    if (st.v === 'rotation') setView('rotation')
    if (st.n >= 7 && st.n <= 14) setSquad(st.n)
    if ([2, 3, 4].includes(st.p)) setPeriods(st.p)
    if (st.g === 0) setGkRotates(false)
    if (st.gm >= 1 && st.gm <= 14) setGame(st.gm)
    if (typeof st.nm === 'string') setNames(st.nm.slice(0, 200))
    if (st.ph === 'out') setPhase('out')
    if (Array.isArray(st.a)) {
      setArrows(
        st.a
          .filter((v) => Array.isArray(v) && v.length === 4 && v.every((n) => Number.isFinite(+n)))
          .slice(0, 20)
          .map(([x1, y1, x2, y2]) => ({
            x1: clamp(+x1, 0, FIELD.w), y1: clamp(+y1, 0, FIELD.h), x2: clamp(+x2, 0, FIELD.w), y2: clamp(+y2, 0, FIELD.h),
          }))
      )
    }
    if (st.os === '' || st.os === null) setOppShape(null)
    else if (st.os && SHAPES[st.os]) setOppShape(st.os)
    const next = {}
    ON_KEYS.forEach((k) => (next[k] = Array.isArray(st.f) && st.f.includes(k)))
    setOn(next)
    setHinted(true)
    touched.current = true
    // Bring a shared board into view.
    setTimeout(() => toolRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 300)
  }, [])

  const stateForHash = useMemo(() => {
    const o = {}
    Object.entries(overrides).forEach(([id, p]) => (o[id] = [Math.round(p.x), Math.round(p.y)]))
    return {
      s: shape, k: skinId, o, c: carrier, os: oppShape || '', f: ON_KEYS.filter((k) => on[k]), ph: phase,
      a: arrows.map((r) => [Math.round(r.x1), Math.round(r.y1), Math.round(r.x2), Math.round(r.y2)]),
      v: view, n: squad, p: periods, g: gkRotates ? 1 : 0, gm: game, nm: names,
    }
  }, [shape, skinId, overrides, carrier, on, oppShape, phase, arrows, view, squad, periods, gkRotates, game, names])

  useEffect(() => {
    if (!touched.current || typeof window === 'undefined') return
    const t = setTimeout(() => {
      const enc = encodeState(stateForHash)
      if (enc) window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${HASH_KEY}${enc}`)
    }, 400)
    return () => clearTimeout(t)
  }, [stateForHash])

  // ---- positions -------------------------------------------------------------------------------------------
  const opp = oppShape && view === 'shapes' ? SHAPES[oppShape] : null

  const outOfPossession = phase === 'out' && view === 'shapes' && isSeven
  const basePos = useMemo(() => {
    const out = { gk: { x: s.gk.x, y: s.gk.y } }
    Object.entries(s.p).forEach(([id, pt]) => {
      out[id] = outOfPossession
        ? { x: FIELD.w / 2 + (pt.x - FIELD.w / 2) * OUT_NARROW, y: s.gk.y - (s.gk.y - pt.y) * OUT_DEEP }
        : { x: pt.x, y: pt.y }
    })
    return out
  }, [s, outOfPossession])

  const oppBase = useMemo(() => {
    const out = {}
    if (!opp) return out
    if (opp.gk.show) out['o-gk'] = mirror(opp.gk)
    Object.entries(opp.p).forEach(([id, pt]) => {
      if (!pt.hide) out[`o-${id}`] = mirror(pt)
    })
    return out
  }, [opp])

  const at = (id) => overrides[id] || basePos[id] || oppBase[id]
  const ids = Object.keys(s.p)
  const oppIds = Object.keys(oppBase)

  // ---- undo ------------------------------------------------------------------------------------------------
  const remember = () => {
    history.current.push({ shape, oppShape, overrides, carrier, phase, arrows })
    if (history.current.length > HISTORY_MAX) history.current.shift()
    setHistoryLen(history.current.length)
  }

  const undo = () => {
    const last = history.current.pop()
    setHistoryLen(history.current.length)
    if (!last) return
    markTouched()
    setShape(last.shape)
    setOppShape(last.oppShape)
    setOverrides(last.overrides)
    setCarrier(last.carrier)
    setPhase(last.phase)
    setArrows(last.arrows)
    setPassFlash(null)
    trackOnce('undo')
  }

  // ---- actions ---------------------------------------------------------------------------------------------
  const chooseShape = (key) => {
    if (key === shape) return
    markTouched()
    remember()
    setShape(key)
    // Our players go to the new shape; anything the reader did to the opponent stays.
    setOverrides((ov) => Object.fromEntries(Object.entries(ov).filter(([id]) => id.startsWith('o-'))))
    setPassFlash(null)
    if (key === 'diamond' && (carrier === 'gk' || SHAPES.diamond.p[carrier]?.hide)) setCarrier('p1')
  }

  const chooseOpp = (key) => {
    if (key === oppShape) return
    markTouched()
    remember()
    setOppShape(key)
    setOverrides((ov) => Object.fromEntries(Object.entries(ov).filter(([id]) => !id.startsWith('o-'))))
    if (key) trackOnce('opponent_shape', { shape: key })
  }

  const choosePhase = (key) => {
    if (key === phase) return
    markTouched()
    remember()
    setPhase(key)
    // Our players take up the new positions; the opponent stays where the reader left it.
    setOverrides((ov) => Object.fromEntries(Object.entries(ov).filter(([id]) => id.startsWith('o-'))))
    setPassFlash(null)
    trackOnce(`phase_${key}`)
  }

  const reset = () => {
    markTouched()
    remember()
    setArrows([])
    setOverrides({})
    setCarrier('p1')
    setPassFlash(null)
  }

  const passTo = (id) => {
    if (id === carrier || outOfPossession) return
    markTouched()
    remember()
    setPassFlash({ from: carrier, to: id, key: Date.now() })
    setCarrier(id)
    trackOnce('pass')
  }

  // iOS Safari ignores `touch-action` on SVG children, so a finger on a player would scroll the page instead of
  // moving them. Claim touches that start on a player (and only those) with non-passive listeners; the rest of the
  // pitch still scrolls the page.
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return undefined
    const start = (e) => {
      if (drawOnRef.current || (e.target && e.target.closest && e.target.closest('.sb-player'))) e.preventDefault()
    }
    const move = (e) => {
      if (dragRef.current || drawRef.current) e.preventDefault()
    }
    svg.addEventListener('touchstart', start, { passive: false })
    svg.addEventListener('touchmove', move, { passive: false })
    return () => {
      svg.removeEventListener('touchstart', start)
      svg.removeEventListener('touchmove', move)
    }
  }, [])

  // ---- dragging --------------------------------------------------------------------------------------------
  const toSvg = (e) => {
    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const m = svg.getScreenCTM()
    if (!m) return { x: 0, y: 0 }
    const p = pt.matrixTransform(m.inverse())
    return { x: clamp(p.x, BOUNDS.minX, BOUNDS.maxX), y: clamp(p.y, BOUNDS.minY, BOUNDS.maxY) }
  }

  const onDown = (id) => (e) => {
    e.preventDefault()
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch {
      // Some browsers throw if the pointer is already gone; dragging still works through the move handler.
    }
    const start = toSvg(e)
    const cur = at(id)
    dragRef.current = { id, start, grab: { x: cur.x - start.x, y: cur.y - start.y }, moved: false }
    setHinted(true)
  }

  const onMove = (e) => {
    const d = dragRef.current
    if (!d) return
    const p = toSvg(e)
    if (!d.moved && Math.hypot(p.x - d.start.x, p.y - d.start.y) < 5) return
    if (!d.moved) {
      d.moved = true
      touched.current = true
      remember()
      setDragging(true)
      trackOnce('drag')
    }
    const nx = clamp(p.x + d.grab.x, BOUNDS.minX, BOUNDS.maxX)
    const ny = clamp(p.y + d.grab.y, BOUNDS.minY, BOUNDS.maxY)
    setOverrides((o) => ({ ...o, [d.id]: { x: nx, y: ny } }))
  }

  // After a drop, ease the player off anyone they were dropped on.
  const settle = (id) => {
    setOverrides((ov) => {
      const cur = ov[id]
      if (!cur) return ov
      const pos = (k) => ov[k] || basePos[k] || oppBase[k]
      const visible = [...(s.gk.show ? ['gk'] : []), ...ids.filter((k) => !s.p[k].hide), ...oppIds]
      const others = visible.filter((k) => k !== id).map(pos).filter(Boolean)
      let { x, y } = cur
      for (let i = 0; i < 4; i++) {
        others.forEach((o) => {
          let dx = x - o.x
          let dy = y - o.y
          let dist = Math.hypot(dx, dy)
          if (dist >= MIN_GAP) return
          if (dist < 0.01) {
            dx = 0
            dy = -1
            dist = 1
          }
          const push = MIN_GAP - dist
          x += (dx / dist) * push
          y += (dy / dist) * push
        })
      }
      x = clamp(x, BOUNDS.minX, BOUNDS.maxX)
      y = clamp(y, BOUNDS.minY, BOUNDS.maxY)
      if (Math.abs(x - cur.x) < 0.5 && Math.abs(y - cur.y) < 0.5) return ov
      return { ...ov, [id]: { x, y } }
    })
  }

  const onUp = () => {
    const d = dragRef.current
    dragRef.current = null
    setDragging(false)
    if (!d) return
    if (d.moved) settle(d.id)
    else if (!d.id.startsWith('o-') && view === 'shapes') passTo(d.id)
  }

  const onKey = (id) => (e) => {
    const step = e.shiftKey ? 20 : 10
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }
    if (moves[e.key]) {
      e.preventDefault()
      markTouched()
      remember()
      const cur = at(id)
      const [dx, dy] = moves[e.key]
      setOverrides((o) => ({
        ...o,
        [id]: { x: clamp(cur.x + dx, BOUNDS.minX, BOUNDS.maxX), y: clamp(cur.y + dy, BOUNDS.minY, BOUNDS.maxY) },
      }))
    } else if ((e.key === 'Enter' || e.key === ' ') && !id.startsWith('o-') && view === 'shapes') {
      e.preventDefault()
      passTo(id)
    }
  }

  // ---- drawing arrows -------------------------------------------------------------------------------------
  useEffect(() => {
    drawOnRef.current = drawOn && view === 'shapes'
  }, [drawOn, view])

  const drawDown = (e) => {
    if (!drawOnRef.current) return
    e.preventDefault()
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId)
    } catch {
      // see onDown
    }
    const p = toSvg(e)
    drawRef.current = p
    draftRef.current = { x1: p.x, y1: p.y, x2: p.x, y2: p.y }
    setDraft(draftRef.current)
    setHinted(true)
  }

  const drawMove = (e) => {
    const from = drawRef.current
    if (!from) return
    const p = toSvg(e)
    draftRef.current = { x1: from.x, y1: from.y, x2: p.x, y2: p.y }
    setDraft(draftRef.current)
  }

  const drawUp = () => {
    const from = drawRef.current
    const d = draftRef.current
    drawRef.current = null
    draftRef.current = null
    setDraft(null)
    if (!from || !d || Math.hypot(d.x2 - d.x1, d.y2 - d.y1) < MIN_ARROW) return
    touched.current = true
    remember()
    setArrows((list) => [...list, d].slice(-20))
    trackOnce('arrow')
  }

  // ---- share + export --------------------------------------------------------------------------------------
  const flashStatus = (msg) => {
    setStatus(msg)
    setTimeout(() => setStatus(''), 2200)
  }

  const copyLink = async () => {
    markTouched()
    const enc = encodeState(stateForHash)
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}${HASH_KEY}${enc}`
    try {
      window.history.replaceState(null, '', url)
      await navigator.clipboard.writeText(url)
      flashStatus('Link copied')
    } catch {
      flashStatus('Copy the link from the address bar')
    }
    trackOnce('share')
  }

  const title = `${s.notation === 'Diamond' ? '4v4 diamond' : s.notation}${opp ? ` v ${opp.notation === 'Diamond' ? '4v4 diamond' : opp.notation}` : ''}`

  const saveImage = async () => {
    const svg = svgRef.current
    if (!svg) return
    try {
      const clone = svg.cloneNode(true)
      const live = svg.querySelectorAll('*')
      const copy = clone.querySelectorAll('*')
      const props = [
        'fill', 'stroke', 'stroke-width', 'stroke-dasharray', 'stroke-linecap', 'opacity', 'font-family',
        'font-size', 'font-weight', 'letter-spacing', 'transform', 'filter',
      ]
      const drop = []
      live.forEach((el, i) => {
        const c = copy[i]
        if (el.classList && (el.classList.contains('sb-hit') || el.classList.contains('sb-pulse'))) {
          drop.push(c)
          return
        }
        const cs = window.getComputedStyle(el)
        let st = ''
        props.forEach((p) => {
          const v = cs.getPropertyValue(p)
          if (v) st += `${p}:${v};`
        })
        c.setAttribute('style', st)
        c.removeAttribute('tabindex')
        c.removeAttribute('role')
      })
      drop.forEach((n) => n.remove())

      // Inline the ball render so the exported image is self-contained.
      const img = clone.querySelector('image')
      if (img) {
        const blob = await (await fetch(withBasePath('/images/shape-board/ball.webp'))).blob()
        const dataUrl = await new Promise((resolve, reject) => {
          const r = new FileReader()
          r.onload = () => resolve(r.result)
          r.onerror = reject
          r.readAsDataURL(blob)
        })
        img.setAttribute('href', dataUrl)
      }

      const vb = svg.viewBox.baseVal
      const NS = 'http://www.w3.org/2000/svg'
      const head = document.createElementNS(NS, 'text')
      head.setAttribute('x', String(vb.x + 14))
      head.setAttribute('y', String(vb.y + 26))
      head.setAttribute('style', `fill:${skin.line};font-family:monospace;font-size:20px;font-weight:700;`)
      head.textContent = title
      clone.appendChild(head)
      const mark = document.createElementNS(NS, 'text')
      mark.setAttribute('x', String(vb.x + vb.width - 14))
      mark.setAttribute('y', String(vb.y + vb.height - 12))
      mark.setAttribute('text-anchor', 'end')
      mark.setAttribute('style', `fill:${skin.line};font-family:monospace;font-size:13px;opacity:0.8;`)
      mark.textContent = 'PitchLabs · usepitchlabs.com/learn'
      clone.appendChild(mark)

      const scale = 2
      clone.setAttribute('xmlns', NS)
      clone.setAttribute('width', String(Math.round(vb.width * scale)))
      clone.setAttribute('height', String(Math.round(vb.height * scale)))
      clone.removeAttribute('class')

      const xml = new XMLSerializer().serializeToString(clone)
      const image = new Image()
      await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = reject
        image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`
      })
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(vb.width * scale)
      canvas.height = Math.round(vb.height * scale)
      canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
      const png = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
      if (!png) throw new Error('no png')
      const a = document.createElement('a')
      a.href = URL.createObjectURL(png)
      a.download = `7v7-${title.replace(/\s+/g, '-')}.png`
      a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 2000)
      flashStatus('Image saved')
      trackOnce('save_image', { shape })
    } catch {
      flashStatus('Could not save the image here')
    }
  }

  // ---- overlays --------------------------------------------------------------------------------------------
  // Each row line connects its players left to right, so a staggered back three reads as the V it is.
  const rowSegments =
    canLines && on.lines
      ? s.rows.map((rowIds) =>
          rowIds
            .map((id) => at(id))
            .sort((a, b) => a.x - b.x)
            .map((p) => `${p.x},${p.y}`)
            .join(' ')
        )
      : []

  const diamondPoints = canDiamond && on.diamond ? s.diamond.map((id) => `${at(id).x},${at(id).y}`).join(' ') : ''

  const carrierPos = at(carrier) || at('p1')
  const opponents = oppIds.map((id) => at(id))

  const lanes =
    on.lanes && view === 'shapes' && !outOfPossession
      ? [...ids.filter((id) => !s.p[id].hide), ...(s.gk.show ? ['gk'] : [])]
          .filter((id) => id !== carrier)
          .map((id) => {
            const to = at(id)
            const blocked = opponents.some((o) => distToSegment(o, carrierPos, to) < LANE_CLEARANCE)
            return { id, to, blocked }
          })
      : []

  const matchup = (shape === '321' && oppShape === '231') || (shape === '231' && oppShape === '321')

  // ---- rotation plan ---------------------------------------------------------------------------------------
  const slotList = useMemo(() => {
    const sh = SHAPES[shape === 'diamond' ? '321' : shape]
    return [
      { id: 'gk', role: 'GK', line: 'G' },
      ...Object.entries(sh.p).map(([id, pt]) => ({ id, role: pt.role, line: lineOf(pt.role) })),
    ]
  }, [shape])

  // The plan gives its last players the shorter share. "Game" shifts which real players those are, so it is not
  // the same ones every week. A fixed keeper (player 1) stays put.
  const plan = useMemo(() => {
    const raw = planRotation({ players: squad, periods, slots: slotList, gkRotates })
    // Step by the size of the short-share group, so the players who had fewer periods last game are not short again.
    const pool = gkRotates ? squad : squad - 1
    const shortCount = raw.played.filter((n) => n === raw.minPlayed).length
    const step = raw.minPlayed === raw.maxPlayed ? 1 : Math.max(1, Math.min(shortCount, pool))
    const games = Math.max(1, Math.ceil(pool / step))
    const off = ((Math.min(game, games) - 1) * step) % pool
    const perm = Array.from({ length: squad }, (_, k) =>
      gkRotates ? (k + off) % squad : k === 0 ? 0 : 1 + ((k - 1 + off) % (squad - 1))
    )
    const grid = Array.from({ length: squad }, () => null)
    const played = Array.from({ length: squad }, () => 0)
    perm.forEach((player, k) => {
      grid[player] = raw.grid[k]
      played[player] = raw.played[k]
    })
    const perPeriod = raw.perPeriod.map((pp) => ({
      assign: Object.fromEntries(Object.entries(pp.assign).map(([slot, k]) => [slot, perm[k]])),
      bench: pp.bench.map((k) => perm[k]).sort((a, b) => a - b),
    }))
    return { grid, played, perPeriod, minPlayed: raw.minPlayed, maxPlayed: raw.maxPlayed, games }
  }, [squad, periods, slotList, gkRotates, game])

  const nameList = useMemo(() => names.split(',').map((n) => n.trim()).filter(Boolean), [names])
  const nameOf = (i) => nameList[i] || `Player ${i + 1}`
  const period = Math.min(selPeriod, periods - 1)
  const slotRole = Object.fromEntries(slotList.map((sl) => [sl.id, sl.role]))
  // slot id -> player index for the period shown on the pitch
  const dotPlayer = view === 'rotation' ? plan.perPeriod[period].assign : null
  const uneven = plan.minPlayed !== plan.maxPlayed

  const switchView = (v) => {
    if (v === view) return
    markTouched()
    setView(v)
    if (v === 'rotation' && shape === 'diamond') chooseShape('321')
    trackOnce(`view_${v}`, { view: v })
  }

  const planText = () => {
    const head = `7v7 ${s.notation} · ${squad} players · ${periods} periods · game ${game}`
    const lines = plan.perPeriod.map((pp, t) => {
      const order = slotList.map((sl) => (pp.assign[sl.id] !== undefined ? `${sl.role} ${nameOf(pp.assign[sl.id])}` : null)).filter(Boolean)
      const sub = pp.bench.length ? ` | Sub: ${pp.bench.map((i) => nameOf(i)).join(', ')}` : ''
      return `Period ${t + 1}: ${order.join(' · ')}${sub}`
    })
    return [head, ...lines].join('\n')
  }

  // Prints just the rotation table: the print stylesheet hides the rest of the page while this class is set.
  const printPlan = () => {
    const root = document.documentElement
    root.classList.add('sb-printing')
    const done = () => {
      root.classList.remove('sb-printing')
      window.removeEventListener('afterprint', done)
    }
    window.addEventListener('afterprint', done)
    trackOnce('plan_print', { squad, periods })
    window.print()
  }

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(planText())
      flashStatus('Rotation copied')
    } catch {
      flashStatus('Select the table to copy it')
    }
    trackOnce('plan_copy', { squad, periods })
  }

  // ---- labels ----------------------------------------------------------------------------------------------
  // Conventional position number for a dot, or null. The opponent faces down the pitch, so its left and right
  // are swapped on screen: take the number of the mirrored slot.
  const numFor = (id) => {
    if (!on.nums || view !== 'shapes') return null
    if (id === 'gk') return s.gk.show ? s.gk.num ?? null : null
    if (id === 'o-gk') return opp ? opp.gk.num ?? null : null
    if (id.startsWith('o-')) {
      const slot = opp ? opp.p[id.slice(2)] : null
      if (!slot || slot.num == null) return null
      const partner = Object.values(opp.p).find((q) => q.y === slot.y && Math.abs(q.x - (FIELD.w - slot.x)) < 1)
      return (partner || slot).num
    }
    return s.p[id] ? s.p[id].num ?? null : null
  }

  const labelFor = (id, role) => {
    if (dotPlayer && !id.startsWith('o-') && dotPlayer[id] !== undefined) return String(dotPlayer[id] + 1)
    const pn = numFor(id)
    return pn !== null ? String(pn) : role
  }

  // What the labels on our dots mean, for the legend under the pitch: [labels, meaning] in pitch order. Built for
  // every shape, with letters and with numbers, so the legend can hold them all and keep one height.
  const legends = useMemo(() => {
    const build = (sh, showNums) => {
      const seen = new Map()
      const add = (label, role) => {
        const key = roleName(role)
        if (!seen.has(key)) seen.set(key, [])
        if (!seen.get(key).includes(label)) seen.get(key).push(label)
      }
      if (sh.gk.show) add(showNums ? String(sh.gk.num) : 'GK', 'GK')
      Object.values(sh.p)
        .filter((q) => !q.hide)
        .sort((x, y) => y.y - x.y || x.x - y.x)
        .forEach((q) => add(showNums && q.num != null ? String(q.num) : q.role, q.role))
      return [...seen.entries()].map(([meaning, labels]) => ({
        labels: labels.sort((x, y) => Number(x) - Number(y) || x.localeCompare(y)).join(', '),
        meaning: labels.length > 1 ? `${meaning}s` : meaning,
      }))
    }
    return ORDER.flatMap((k) => [
      { key: `${k}:roles`, list: build(SHAPES[k], false) },
      { key: `${k}:nums`, list: build(SHAPES[k], k !== 'diamond') },
    ])
  }, [])
  const legendKey = `${shape}:${on.nums && isSeven ? 'nums' : 'roles'}`

  const describe = (sh) => {
    const counts = {}
    ;[...(sh.gk.show ? ['GK'] : []), ...Object.values(sh.p).filter((q) => !q.hide).map((q) => q.role)].forEach(
      (r) => (counts[r] = (counts[r] || 0) + 1)
    )
    return Object.entries(counts)
      .map(([r, n]) => `${n} ${roleName(r)}${n > 1 ? 's' : ''}`)
      .join(', ')
  }
  const srSummary =
    view === 'rotation'
      ? `Rotation planner for a ${s.notation} with ${squad} players over ${periods} periods, game ${game}. The pitch shows period ${period + 1}.`
      : `Your team, ${s.notation}${outOfPossession ? ', out of possession' : ''}: ${describe(s)}.${arrows.length ? ` ${arrows.length} arrow${arrows.length > 1 ? 's' : ''} drawn.` : ''}${opp ? ` Opponent, ${opp.notation}: ${describe(opp)}.` : ' No opponent shown.'}`

  // Until the reader has touched anything, a soft ring on one teammate says "tap me".
  const pulseId = hinted || view !== 'shapes' || outOfPossession || drawOn ? null : carrier === 'p2' ? 'p3' : 'p2'

  const renderPlayer = (id, pt, role, meta) => {
    const label = labelFor(id, role)
    return (
      <g
        key={id}
        className="sb-player"
        style={{ transform: `translate(${pt.x}px, ${pt.y}px)`, opacity: meta.hidden ? 0 : 1, pointerEvents: meta.hidden || (drawOn && view === 'shapes') ? 'none' : 'auto' }}
        onPointerDown={onDown(id)}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey(id)}
        tabIndex={meta.hidden ? -1 : 0}
        role="button"
        aria-label={meta.aria}
      >
        <circle r="23" className="sb-hit" />
        {id === pulseId && <circle r="16" className="sb-pulse" />}
        <circle
          r="16"
          className={`sb-dot ${id.startsWith('o-') ? 'sb-opp' : 'sb-us'}${id === 'gk' || id === 'o-gk' ? ' sb-gk' : ''}${id === carrier && view === 'shapes' && !outOfPossession ? ' sb-carrier' : ''}`}
        />
        {label ? (
          <text className="sb-label" textAnchor="middle" dy="3.5">
            {label}
          </text>
        ) : null}
      </g>
    )
  }

  const G = GEOMETRY
  const vbPad = 18
  const tapHint = view === 'shapes' && !outOfPossession ? 'Drag to move, tap to pass the ball.' : 'Drag to move.'
  const teamOptions = ORDER.filter((k) => view === 'shapes' || k !== 'diamond').map((key) => ({ key, label: SHAPES[key].label }))
  const oppOptions = [{ key: null, label: 'Off' }, ...ORDER.map((key) => ({ key, label: SHAPES[key].label }))]
  const skinOptions = Object.values(SKINS).map((k) => ({ key: k.id, label: k.label }))

  return (
    <div className="step-tool sb-tool" ref={toolRef}>
      <div className="sb-top">
        <span className="tech-eyebrow">
          <span aria-hidden="true" className="tech-eyebrow-tick" />
          Interactive · 7v7 formation builder
        </span>
        <div className="sb-viewswitch">
          <Segmented
            label="Mode"
            options={[
              { key: 'shapes', label: 'Shape board' },
              { key: 'rotation', label: 'Rotation planner' },
            ]}
            value={view}
            onChange={switchView}
          />
        </div>
      </div>

      <div className="sb-layout">
        <div className="sb-board">
          <div className="sb-notation">
            <span className="sb-notation-num">{s.notation}</span>
            {opp && (
              <span className="sb-notation-vs">
                <span className="sb-notation-v">v</span> <span className="sb-notation-opp">{opp.notation}</span>
              </span>
            )}
          </div>
          <p className="sb-notation-note">
            {isSeven ? `${s.keeperNotation} with the keeper counted` : 'U.S. Soccer writes the 4v4 shape as a 1-2-1'}
          </p>

          <p className="sr-only" aria-live="polite">
            {srSummary}
          </p>

          <div className="sb-pitch-wrap">
            <svg
              ref={svgRef}
              className={`sb-pitch${dragging ? ' sb-dragging' : ''}${drawOn && view === 'shapes' ? ' sb-drawing' : ''}`}
              onPointerDown={drawDown}
              onPointerMove={drawMove}
              onPointerUp={drawUp}
              onPointerCancel={drawUp}
              viewBox={`${-vbPad} ${-vbPad - 6} ${FIELD.w + vbPad * 2} ${FIELD.h + vbPad * 2 + 12}`}
              role="group"
              aria-label={`A 7v7 pitch showing a ${s.notation === 'Diamond' ? '4v4 diamond' : s.notation} shape, our goal at the bottom.`}
            >
              <defs>
                {skin.stripes && (
                  <pattern id="sb-stripes" width={FIELD.w} height="100" patternUnits="userSpaceOnUse">
                    <rect width={FIELD.w} height="50" fill={skin.stripes[0]} />
                    <rect y="50" width={FIELD.w} height="50" fill={skin.stripes[1]} />
                  </pattern>
                )}
                <marker id="sb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10 z" fill="#ffffff" />
                </marker>
              </defs>

              {/* surround, then the field itself, drawn from PitchLabs' 7v7 spec */}
              <rect x={-vbPad - 6} y={-vbPad - 12} width={FIELD.w + vbPad * 2 + 12} height={FIELD.h + vbPad * 2 + 24} fill={skin.exterior} />
              <rect x="0" y="0" width={FIELD.w} height={FIELD.h} fill={skin.stripes ? 'url(#sb-stripes)' : skin.fill} />
              <g className="sb-lines" style={{ stroke: skin.line }}>
                <rect x="0" y="0" width={FIELD.w} height={FIELD.h} className="sb-mark" />
                <line x1="0" y1={FIELD.h / 2} x2={FIELD.w} y2={FIELD.h / 2} className="sb-mark" />
                <circle cx={G.circle.cx} cy={G.circle.cy} r={G.circle.r} className="sb-mark" />
                <circle cx={G.circle.cx} cy={G.circle.cy} r="2.5" className="sb-spot" style={{ fill: skin.line }} />
                <rect x={G.penTop.x} y={G.penTop.y} width={G.penTop.w} height={G.penTop.h} className="sb-mark" />
                <rect x={G.penBottom.x} y={G.penBottom.y} width={G.penBottom.w} height={G.penBottom.h} className="sb-mark" />
                <rect x={G.areaTop.x} y={G.areaTop.y} width={G.areaTop.w} height={G.areaTop.h} className="sb-mark" />
                <rect x={G.areaBottom.x} y={G.areaBottom.y} width={G.areaBottom.w} height={G.areaBottom.h} className="sb-mark" />
                <path d={G.arcTop} className="sb-mark" />
                <path d={G.arcBottom} className="sb-mark" />
                <circle cx={G.spotTop.x} cy={G.spotTop.y} r="2.5" className="sb-spot" style={{ fill: skin.line }} />
                <circle cx={G.spotBottom.x} cy={G.spotBottom.y} r="2.5" className="sb-spot" style={{ fill: skin.line }} />
                <rect x={G.goalTop.x} y={G.goalTop.y} width={G.goalTop.w} height={G.goalTop.h} className="sb-goal" />
                <rect x={G.goalBottom.x} y={G.goalBottom.y} width={G.goalBottom.w} height={G.goalBottom.h} className="sb-goal" />
              </g>

              {on.zones && (
                <g className="sb-zones">
                  <rect x="0" y={FIELD.h / 3} width={FIELD.w} height={FIELD.h / 3} className="sb-zone-band" />
                  <line x1={FIELD.w / 3} y1="0" x2={FIELD.w / 3} y2={FIELD.h} className="sb-zone-line" />
                  <line x1={(FIELD.w * 2) / 3} y1="0" x2={(FIELD.w * 2) / 3} y2={FIELD.h} className="sb-zone-line" />
                </g>
              )}

              {[BUILD_OUT.upperY, BUILD_OUT.lowerY].map((y) => (
                <g key={y}>
                  <line x1="0" y1={y} x2={FIELD.w} y2={y} className="sb-buildout" />
                  <text transform={`translate(-6 ${y}) rotate(-90)`} textAnchor="middle" className="sb-buildout-label">
                    build-out line
                  </text>
                </g>
              ))}

              {rowSegments.map((pts, i) => (
                <polyline key={`${shape}-${i}`} points={pts} fill="none" className="sb-row" />
              ))}

              {diamondPoints && <polygon points={diamondPoints} className="sb-diamond" />}

              {lanes.map((l) => (
                <line
                  key={l.id}
                  x1={carrierPos.x}
                  y1={carrierPos.y}
                  x2={l.to.x}
                  y2={l.to.y}
                  className={l.blocked ? 'sb-lane sb-lane-blocked' : 'sb-lane'}
                />
              ))}

              {view === 'shapes' &&
                [...arrows, ...(draft ? [draft] : [])].map((r, i) => (
                  <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} className="sb-arrow-line" markerEnd="url(#sb-arrow)" />
                ))}

              {passFlash && at(passFlash.from) && at(passFlash.to) && (
                <line
                  key={passFlash.key}
                  x1={at(passFlash.from).x}
                  y1={at(passFlash.from).y}
                  x2={at(passFlash.to).x}
                  y2={at(passFlash.to).y}
                  className="sb-pass"
                  markerEnd="url(#sb-arrow)"
                />
              )}

              {oppIds.map((id) =>
                renderPlayer(id, at(id), '', {
                  aria: id === 'o-gk' ? 'Opponent goalkeeper. Drag to move.' : 'Opponent player. Drag to move.',
                })
              )}

              {renderPlayer('gk', at('gk'), 'GK', {
                hidden: !s.gk.show,
                aria: `Our goalkeeper. ${tapHint}`,
              })}

              {ids.map((id) =>
                renderPlayer(id, at(id), s.p[id].role, {
                  hidden: s.p[id].hide,
                  aria: `Our ${roleName(s.p[id].role)}. ${tapHint}`,
                })
              )}

              {/* the ball sits with its carrier: the app's own ball render */}
              {view === 'shapes' && !outOfPossession && (
                <g className="sb-ballg" style={{ transform: `translate(${carrierPos.x + 17}px, ${carrierPos.y - 17}px)` }}>
                  <image
                    href={withBasePath('/images/shape-board/ball.webp')}
                    x="-9"
                    y="-9"
                    width="18"
                    height="18"
                    className="sb-ball-img"
                  />
                </g>
              )}
            </svg>
          </div>

          {view === 'shapes' ? (
            <>
              <StateStack
                active={drawOn ? 'draw' : outOfPossession ? 'out' : 'tap'}
                items={[
                  {
                    key: 'tap',
                    node: (
                      <p className="sb-hint">
                        <strong>Tap</strong> a player to pass · <strong>drag</strong> to move
                      </p>
                    ),
                  },
                  {
                    key: 'out',
                    node: (
                      <p className="sb-hint">
                        Out of possession · <strong>drag</strong> to move
                      </p>
                    ),
                  },
                  {
                    key: 'draw',
                    node: (
                      <p className="sb-hint">
                        <strong>Drag</strong> on the pitch to draw an arrow · <strong>Undo</strong> removes the last
                      </p>
                    ),
                  },
                ]}
              />
              <StateStack
                active={legendKey}
                items={legends.map((l) => ({
                  key: l.key,
                  node: (
                    <ul className="sb-legend" aria-label="What the labels mean">
                      {l.list.map((row) => (
                        <li key={row.meaning}>
                          <span className="sb-legend-key">{row.labels}</span> {row.meaning}
                        </li>
                      ))}
                    </ul>
                  ),
                }))}
              />
            </>
          ) : (
            <p className="sb-hint">
              Showing <strong>period {period + 1}</strong>. The numbers are the players in the table.
            </p>
          )}
        </div>

        {view === 'shapes' ? (
          <div className="sb-panel">
            <div className="sb-group">
              <span className="sb-group-label">Your team</span>
              <Segmented label="Your shape" options={teamOptions} value={shape} onChange={chooseShape} />
              <div className="sb-seg-gap">
                <Segmented
                  label="Phase"
                  options={[
                    { key: 'in', label: 'In possession' },
                    { key: 'out', label: 'Out of possession' },
                  ]}
                  value={isSeven ? phase : 'in'}
                  onChange={choosePhase}
                  disabled={!isSeven}
                />
              </div>
            </div>

            <div className="sb-group">
              <span className="sb-group-label sb-group-label-opp">Opponent</span>
              <Segmented label="Opponent shape" options={oppOptions} value={oppShape} onChange={chooseOpp} tone="opp" />
            </div>

            <div className="sb-group">
              <span className="sb-group-label">Show</span>
              <div className="sb-switches" role="group" aria-label="Show on the pitch">
                <Switch pressed={on.lines && canLines} disabled={!canLines} onClick={() => flip('lines')}>
                  Lines
                </Switch>
                <Switch pressed={on.diamond && canDiamond} disabled={!canDiamond} onClick={() => flip('diamond')}>
                  Diamond
                </Switch>
                <Switch pressed={on.lanes && !outOfPossession} disabled={outOfPossession} onClick={() => flip('lanes')}>
                  Passing lanes
                </Switch>
                <Switch pressed={on.nums && isSeven} disabled={!isSeven} onClick={() => flip('nums')}>
                  Position numbers
                </Switch>
                <Switch pressed={on.zones} onClick={() => flip('zones')}>
                  Zones
                </Switch>
                <Switch
                  pressed={drawOn}
                  onClick={() => {
                    setHinted(true)
                    setDrawOn((v) => !v)
                  }}
                >
                  Draw arrows
                </Switch>
              </div>
            </div>

            <div className="sb-group">
              <span className="sb-group-label">Pitch</span>
              <Segmented
                label="Pitch style"
                options={skinOptions}
                value={skinId}
                onChange={(k) => {
                  markTouched()
                  setSkinId(k)
                }}
              />
            </div>

            <div className="sb-group">
              <div className="sb-actions">
                <button type="button" className="sb-btn" onClick={undo} disabled={historyLen === 0}>
                  Undo
                </button>
                <button type="button" className="sb-btn" onClick={reset} disabled={Object.keys(overrides).length === 0 && arrows.length === 0}>
                  Reset
                </button>
                <button type="button" className="sb-btn" onClick={saveImage} aria-label="Save as image">
                  Save PNG
                </button>
                <button type="button" className="sb-btn" onClick={copyLink}>
                  Copy link
                </button>
              </div>
              <p className="sb-status" role="status" aria-live="polite">
                {status}
              </p>
              <TrackedCtaLink href={`${APP_URL}/graphics-builder?field=7v7`} location="shape_board_open_builder" className="sb-open-link">
                Open a 7v7 field in PitchLabs &rarr;
              </TrackedCtaLink>
            </div>
          </div>
        ) : (
          <div className="sb-panel">
            <div className="sb-group">
              <span className="sb-group-label">Shape</span>
              <Segmented label="Shape" options={teamOptions} value={shape} onChange={chooseShape} />
            </div>

            <div className="sb-group">
              <span className="sb-group-label">Squad</span>
              <Stepper
                label="in the squad"
                value={`${squad} players`}
                lessLabel="One fewer player"
                moreLabel="One more player"
                canLess={squad > 7}
                canMore={squad < 14}
                onLess={() => {
                  markTouched()
                  setSquad((n) => Math.max(7, n - 1))
                  setGame(1)
                }}
                onMore={() => {
                  markTouched()
                  setSquad((n) => Math.min(14, n + 1))
                  setGame(1)
                }}
              />
            </div>

            <div className="sb-group">
              <span className="sb-group-label">Periods</span>
              <Segmented
                label="Periods"
                options={[
                  { key: 2, label: 'Halves' },
                  { key: 3, label: 'Thirds' },
                  { key: 4, label: 'Quarters' },
                ]}
                value={periods}
                onChange={(n) => {
                  markTouched()
                  setPeriods(n)
                  setSelPeriod(0)
                  setGame(1)
                }}
              />
            </div>

            <div className="sb-group">
              <span className="sb-group-label">Keeper</span>
              <Segmented
                label="Keeper"
                options={[
                  { key: true, label: 'Rotates' },
                  { key: false, label: 'Player 1 stays in goal' },
                ]}
                value={gkRotates}
                onChange={(v) => {
                  markTouched()
                  setGkRotates(v)
                  setGame(1)
                }}
              />
            </div>

            <div className="sb-group">
              <span className="sb-group-label">Game</span>
              <Stepper
                label="of the season"
                value={`Game ${Math.min(game, plan.games)} of ${plan.games}`}
                lessLabel="Previous game"
                moreLabel="Next game"
                canLess={game > 1}
                canMore={game < plan.games}
                onLess={() => {
                  markTouched()
                  setGame((g) => Math.max(1, g - 1))
                }}
                onMore={() => {
                  markTouched()
                  setGame((g) => Math.min(plan.games, g + 1))
                  trackOnce('next_game')
                }}
              />
            </div>

            <div className="sb-group">
              <label className="sb-group-label" htmlFor="sb-names">
                Names (optional)
              </label>
              <input
                id="sb-names"
                className="sb-input"
                type="text"
                maxLength={200}
                name="names"
                autoComplete="off"
                spellCheck={false}
                placeholder="Sam, Ali, Priya…"
                value={names}
                onChange={(e) => {
                  markTouched()
                  setNames(e.target.value)
                }}
              />
            </div>
          </div>
        )}
      </div>

      {view === 'shapes' ? (
        <div className="sb-caption">
          <StateStack active={shape} items={ORDER.map((k) => ({ key: k, node: <p>{CAPTIONS[k]}</p> }))} />
          <StateStack
            active={outOfPossession ? 'out' : matchup ? `m-${shape}` : 'none'}
            items={[
              { key: 'none', node: <p /> },
              { key: 'out', node: <p>Out of possession the shape stays the same, just naturally narrower and deeper.</p> },
              { key: 'm-321', node: <p>{MATCHUPS['321']}</p> },
              { key: 'm-231', node: <p>{MATCHUPS['231']}</p> },
            ]}
          />
          <p className="sb-caption-small">
            Positions are illustrative, not measured. Build-out lines are drawn midway between the penalty area and
            halfway, and leagues differ, so check yours. A dashed red passing lane has an opponent standing in it. Zones
            shade the middle third and mark the three channels. Position numbers follow the usual 11-a-side convention,
            and clubs number 7v7 their own ways.
          </p>
        </div>
      ) : (
        <div className="sb-plan">
          <p className="sb-print-only sb-print-title">
            7v7 rotation · {s.notation} · {squad} players · {periods} periods · game {game}
          </p>
          <p className="sb-plan-summary">
            {uneven
              ? `Everyone plays ${plan.minPlayed} or ${plan.maxPlayed} of ${periods} periods. Step to the next game to change who gets fewer.`
              : `Everyone plays ${plan.minPlayed} of ${periods} periods.`}{' '}
            {plan.minPlayed * 2 >= periods
              ? 'Everyone gets at least half the game, which is what the FA’s 7v7 page suggests.'
              : 'Some players get under half the game, below what the FA’s 7v7 page suggests.'}
          </p>

          <div className="sb-plan-scroll">
            <table className="sb-plan-table">
              <thead>
                <tr>
                  <th scope="col">Player</th>
                  {Array.from({ length: periods }, (_, t) => (
                    <th scope="col" key={t} className={t === period ? 'is-on' : ''}>
                      <button
                        type="button"
                        className="sb-plan-period"
                        aria-pressed={t === period}
                        aria-label={`Show period ${t + 1} on the pitch`}
                        onClick={() => setSelPeriod(t)}
                      >
                        P{t + 1}
                      </button>
                    </th>
                  ))}
                  <th scope="col">Played</th>
                </tr>
              </thead>
              <tbody>
                {plan.grid.map((row, i) => (
                  <tr key={i}>
                    <th scope="row">
                      <span className="sb-plan-num">{i + 1}</span>
                      {nameOf(i)}
                    </th>
                    {row.map((slot, t) => (
                      <td key={t} className={t === period ? 'is-on' : ''}>
                        {slot ? (
                          <span className={`sb-cell sb-cell-${lineOf(slotRole[slot])}`}>{slotRole[slot]}</span>
                        ) : (
                          <span className="sb-cell sb-cell-sub">sub</span>
                        )}
                      </td>
                    ))}
                    <td className="sb-plan-played">
                      {plan.played[i]}/{periods}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sb-plan-actions">
            <button type="button" className="sb-btn" onClick={copyPlan}>
              Copy as text
            </button>
            <button type="button" className="sb-btn" onClick={printPlan}>
              Print
            </button>
            <button type="button" className="sb-btn" onClick={copyLink}>
              Copy link
            </button>
            <p className="sb-status" role="status" aria-live="polite">
              {status}
            </p>
          </div>

          <p className="sb-caption-small">
            Whoever has sat least sits next, and each player gets the line (defence, midfield, attack) they have had
            least. {gkRotates ? 'The keeper rotates too, as Football Australia’s club template suggests for its youngest age groups. ' : ''}
            It is arithmetic, not advice on who should play where. Tap a period to see it on the pitch.
          </p>
        </div>
      )}
    </div>
  )
}
