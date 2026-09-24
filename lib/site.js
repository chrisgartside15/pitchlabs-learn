/** This site's own public base URL — distinct from APP_URL in lib/analytics.js, which points at
 *  the main PitchLabs app. Production serves this Next app reverse-proxied under usepitchlabs.com
 *  at the /learn subpath (see layout.js's existing openGraph.url and the main app's
 *  NEXT_PUBLIC_LEARN_URL), even though this app's own routes are all root-relative internally —
 *  so anything that needs an absolute URL (metadataBase, sitemap, JSON-LD) needs the /learn
 *  prefix added back on, which SITE_URL below already includes. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://usepitchlabs.com/learn'
