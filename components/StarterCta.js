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
 * `embedded` (set by DownloadCard) lays it out inside the download card, left-aligned above the downloads;
 * otherwise it fills the width of its container (e.g. a formation figure).
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
        <span>{label || 'Open & Edit Template in PitchLabs'}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </TrackedCtaLink>
      <p className="starter-cta-note">Opens in the PitchLabs editor. A free account is needed to save.</p>
      <p className="starter-cta-note starter-cta-note-small-screen">
        Editing needs a laptop or a wide tablet screen (1024&nbsp;px or more).
      </p>
    </div>
  )
}
