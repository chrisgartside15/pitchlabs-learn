/**
 * First-touch attribution, written from Learn. The main PitchLabs app remembers where a visitor first came from
 * (referrer and UTM tags) and attaches it to their account at signup. Learn is served on the same origin in
 * production (www.usepitchlabs.com/learn), so it shares the app's localStorage: recording the first touch here
 * means someone who lands on an article from Instagram and signs up later is credited to Instagram, not to the
 * Learn CTA that took them into the app.
 *
 * Keep this in step with the app's lib/attribution.ts: same storage key, same record shape (v: 1), same
 * cleaning. The app only ever stores a first touch once, so whichever side sees the visitor first wins.
 * Stores no personal data, and fails soft: attribution must never get in the way of reading an article.
 */
export const FIRST_TOUCH_KEY = 'pl_first_touch'

const OWN_HOST = /(^|\.)usepitchlabs\.com$/i

const clean = (v, max = 80) => {
  const t = String(v ?? '').trim().toLowerCase()
  return t ? t.slice(0, max) : null
}

/** Pure: build the record from the page URL and document.referrer. Mirrors parseFirstTouch in the app. */
export function parseFirstTouch(href, referrer, now) {
  let url = null
  try {
    url = new URL(href)
  } catch {
    url = null
  }
  let refHost = null
  let refPath = null
  try {
    if (referrer) {
      const r = new URL(referrer)
      refHost = clean(r.hostname)
      if (refHost && OWN_HOST.test(refHost)) refPath = r.pathname.slice(0, 120)
    }
  } catch {
    // unparseable referrer: treat as none
  }
  return {
    v: 1,
    ts: now.toISOString(),
    ref_host: refHost,
    ref_path: refPath,
    utm_source: clean(url?.searchParams.get('utm_source')),
    utm_medium: clean(url?.searchParams.get('utm_medium')),
    utm_campaign: clean(url?.searchParams.get('utm_campaign')),
    landing: (url?.pathname ?? '/').slice(0, 120),
  }
}

/** Store the first touch once; an existing record (from Learn or the app) is never overwritten. */
export function captureFirstTouch(storage, href, referrer, now = new Date()) {
  if (!storage) return null
  try {
    const raw = storage.getItem(FIRST_TOUCH_KEY)
    if (raw) {
      const existing = JSON.parse(raw)
      if (existing && existing.v === 1 && typeof existing.ts === 'string') return existing
    }
  } catch {
    // unreadable record: replace it below
  }
  try {
    const fresh = parseFirstTouch(href, referrer, now)
    storage.setItem(FIRST_TOUCH_KEY, JSON.stringify(fresh))
    return fresh
  } catch {
    return null
  }
}
