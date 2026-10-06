export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

/** Defaults to production; set NEXT_PUBLIC_APP_URL=http://localhost:3000 locally to point the
 *  "Build Sessions"/CTA links at the main PitchLabs app's own dev server instead, so the two
 *  apps link to each other seamlessly in local dev without touching production DNS/Vercel. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.usepitchlabs.com'

/**
 * Tag a link to the main app so PitchLabs can credit Learn for the visit. Learn's CTAs open with
 * rel="noopener noreferrer", so the app receives NO referrer; UTM tags are the only signal both the app's
 * signup-source capture and GA4 can use. Existing query params are kept and existing utm_* are never
 * overwritten. `campaign` is the article slug when there is one, else the link location.
 */
export function withLearnUtm(href, campaign) {
  try {
    const url = new URL(href)
    const slug = String(campaign || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80)
    if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source', 'learn')
    if (!url.searchParams.has('utm_medium')) url.searchParams.set('utm_medium', 'cta')
    if (slug && !url.searchParams.has('utm_campaign')) url.searchParams.set('utm_campaign', slug)
    return url.toString()
  } catch {
    return href
  }
}

/**
 * next/script strategy="afterInteractive" can run after the first client effect, so gtag may not
 * exist yet when a tracker fires — retry briefly instead of dropping the hit. Mirrors the pattern
 * used in the main PitchLabs app's lib/analytics.ts.
 */
function runWhenGtagReady(run) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    run()
    return
  }
  let attempts = 0
  const maxAttempts = 80
  const id = window.setInterval(() => {
    attempts += 1
    if (typeof window.gtag === 'function') {
      window.clearInterval(id)
      run()
    } else if (attempts >= maxAttempts) {
      window.clearInterval(id)
    }
  }, 50)
}

/** SPA navigations only — the initial page_view comes from gtag('config') in the layout snippet. */
export function pageview(url) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return
  runWhenGtagReady(() => {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
    })
  })
}

export function trackEvent(eventName, params) {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return
  runWhenGtagReady(() => {
    window.gtag('event', eventName, params)
  })
}
