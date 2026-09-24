'use client'

import { useEffect, useState } from 'react'

/**
 * Click-to-expand lightbox for an article diagram — same idea as the main PitchLabs app's
 * Export Proof lightbox on the homepage (click the small card, read the full-size image in an
 * overlay), reimplemented locally with plain state instead of porting that app's
 * useOverlaySyncedDialog/OverlayProvider machinery, which this repo has no equivalent of and
 * doesn't need for a single article image.
 */
export function ImageLightbox({ src, alt, width, height }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View full size: ${alt}`}
        className="lightbox-trigger"
      >
        <img src={src} alt={alt} width={width} height={height} />
        <span aria-hidden="true" className="lightbox-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
          View full size
        </span>
      </button>

      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="lightbox-close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={src}
            alt={alt}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
