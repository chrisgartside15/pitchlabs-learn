'use client'

import { trackEvent } from '@/lib/analytics'

/**
 * External link to the main app (usepitchlabs.com) that fires a GA4 event distinct from a plain
 * pageview, so blog-driven conversions can be told apart from direct traffic. `location` identifies
 * where on the blog the click came from (e.g. "nav", "article_cta") and `articleSlug` is included
 * when the click happened on an article page.
 */
export function TrackedCtaLink({ href, location, articleSlug, className, children, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        trackEvent('blog_cta_click', {
          link_location: location,
          ...(articleSlug ? { article_slug: articleSlug } : {}),
        })
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
