'use client'

import { usePathname } from 'next/navigation'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { starterHref } from '@/lib/starters'

/**
 * Primary call to action that opens a starter template in the PitchLabs builder
 * (usepitchlabs.com/graphics-builder?starter=<id>). Used inside DownloadCard (via its `starter`
 * prop) and on its own in an article.
 *
 * Tracking (GA4): blog_cta_click with link_location "resource_block", article_slug and starter_id.
 * The app then records starter_opened / starter_saved with the same starter_id.
 *
 * `embedded` (set by DownloadCard) drops the standalone card framing so it sits inside the card.
 *
 * Under 1024px the editor is view-only on the app side, so a short note says so (CSS-only, shown
 * below that width); the link still works and the app explains the same thing on arrival.
 *
 * Props are plain strings: next-mdx-remote strips JavaScript expressions from component props.
 */
export function StarterCta({ starter, label, embedded }) {
  const pathname = usePathname()
  // pathname is '/articles/<slug>' (basePath is already stripped by Next).
  const articleSlug = (pathname || '').split('/').filter(Boolean).pop() || ''
  const href = starterHref(starter, articleSlug)
  if (!href) return null

  return (
    <div className={`starter-cta${embedded ? ' starter-cta-embedded' : ''}`}>
      <TrackedCtaLink
        href={href}
        location="resource_block"
        articleSlug={articleSlug || undefined}
        extraParams={{ starter_id: starter }}
        className="starter-cta-button"
      >
        <svg className="starter-cta-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" />
        </svg>
        <span>{label || 'Open & Edit Template in PitchLabs'}</span>
        <svg
          className="starter-cta-arrow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </TrackedCtaLink>
      <p className="starter-cta-note">Opens in the PitchLabs editor. A free account is needed to save.</p>
      <p className="starter-cta-note starter-cta-note-small-screen">
        Editing works best on a laptop or tablet (1024px wide or more).
      </p>
    </div>
  )
}
