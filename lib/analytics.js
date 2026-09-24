export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

/** Defaults to production; set NEXT_PUBLIC_APP_URL=http://localhost:3000 locally to point the
 *  "Build Sessions"/CTA links at the main PitchLabs app's own dev server instead, so the two
 *  apps link to each other seamlessly in local dev without touching production DNS/Vercel. */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://usepitchlabs.com'

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
