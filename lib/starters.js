import { APP_URL } from '@/lib/analytics'

/**
 * Deep links into the PitchLabs builder's starter templates (app repo: lib/starters/registry.ts).
 * The id is an allowlist key in the app; an id the app doesn't know simply opens a blank builder,
 * so a typo here degrades gracefully rather than breaking. Ids are checked for shape only.
 */
const STARTER_ID = /^[a-z0-9][a-z0-9-]{0,63}$/

const slugify = (s) =>
  String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

/**
 * Absolute URL to open a starter in the app, tagged for attribution. The app records utm_source,
 * utm_medium and utm_campaign at signup; utm_content (the article slug) is for GA4 only, because
 * the link opens in a new tab with no referrer and would otherwise lose which article it came from.
 * Returns null for an invalid id so callers render nothing rather than a broken link.
 */
export function starterHref(starterId, articleSlug) {
  if (typeof starterId !== 'string' || !STARTER_ID.test(starterId)) return null
  try {
    const url = new URL('/graphics-builder', APP_URL)
    url.searchParams.set('starter', starterId)
    url.searchParams.set('utm_source', 'learn')
    url.searchParams.set('utm_medium', 'article_resource_block')
    url.searchParams.set('utm_campaign', 'starter_template')
    const content = slugify(articleSlug)
    if (content) url.searchParams.set('utm_content', content)
    return url.toString()
  } catch {
    return null
  }
}
