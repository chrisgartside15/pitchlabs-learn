'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * "Embed this on your club site" box for the 7v7 formation builder page: a read-only snippet and a copy button.
 * The snippet carries a visible text link back to the tool, which is the point: free to use, credited on use.
 */
export function EmbedCode({ src, href, linkText }) {
  const [note, setNote] = useState('')
  const snippet = `<iframe src="${src}" title="7v7 formation builder by PitchLabs" width="100%" height="1000" style="border:0;max-width:760px" loading="lazy"></iframe>\n<p><a href="${href}">${linkText}</a></p>`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      setNote('Copied')
      trackEvent('tool_use', { tool: 'shape_board', action: 'embed_copy' })
    } catch {
      setNote('Select the text and copy it')
    }
    setTimeout(() => setNote(''), 2000)
  }

  return (
    <div className="embed-code">
      <label htmlFor="embed-snippet" className="sr-only">
        Embed code
      </label>
      <textarea id="embed-snippet" className="embed-code-box" readOnly rows={5} value={snippet} onFocus={(e) => e.target.select()} />
      <div className="embed-code-row">
        <button type="button" className="sb-btn" onClick={copy}>
          Copy embed code
        </button>
        <span className="sb-status" role="status" aria-live="polite">
          {note}
        </span>
      </div>
    </div>
  )
}
