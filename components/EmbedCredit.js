'use client'

import { trackEvent } from '@/lib/analytics'

/** The credit link under an embedded board. Counts clicks so the admin can see embeds sending people back. */
export function EmbedCredit({ href, children }) {
  return (
    <p className="embed-credit">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('tool_use', { tool: 'shape_board', action: 'embed_credit_click' })}
      >
        {children}
      </a>
    </p>
  )
}
