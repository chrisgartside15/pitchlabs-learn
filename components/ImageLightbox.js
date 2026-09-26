'use client'

import { useEffect, useRef, useState } from 'react'
import { withBasePath } from '@/lib/site'

/**
 * Click-to-expand lightbox for an article diagram — same idea as the main PitchLabs app's
 * Export Proof lightbox on the homepage (click the small card, read the full-size image in an
 * overlay), reimplemented locally with plain state instead of porting that app's
 * useOverlaySyncedDialog/OverlayProvider machinery, which this repo has no equivalent of and
 * doesn't need for a single article image.
 */
export function ImageLightbox({ src, alt, width, height }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  // `src` comes from an article's plain `/images/...` path — basePath rewrites next/link and
  // next/image automatically, but not an arbitrary string handed to a plain <img>, so it needs
  // the /learn prefix added back on by hand once this is actually served through the proxy.
  const resolvedSrc = withBasePath(src)

  useEffect(() => {
    if (!open) return
    // Close is the dialog's only focusable element, so moving focus there on open and keeping
    // it there on Tab (there's nowhere else inside to go) is a full trap without extra plumbing;
    // focus returns to the trigger on close so keyboard/screen-reader users land back where they
    // started instead of at the top of the page.
    const trigger = triggerRef.current
    closeRef.current?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'Tab') {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label={`View full size: ${alt}`}
        className="lightbox-trigger"
      >
        <img src={resolvedSrc} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
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
        <div
          className="lightbox-overlay"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            ref={closeRef}
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="lightbox-close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={resolvedSrc}
            alt={alt}
            width={width}
            height={height}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
