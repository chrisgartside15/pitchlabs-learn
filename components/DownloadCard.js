'use client'

import { useEffect, useRef, useState } from 'react'
import { withBasePath } from '@/lib/site'
import { trackEvent } from '@/lib/analytics'

/**
 * A printable resource offered inside an article (e.g. the blank activity sheet): a preview
 * thumbnail that opens in a lightbox, plus one download button per paper size, both on the card and
 * inside the lightbox. Files live in public/downloads/. Downloads are plain <a download> rather
 * than next/link, since these are static files, not routes — which also means basePath isn't
 * applied automatically, so every path goes through withBasePath (same reason as ImageLightbox).
 *
 * Tracking (GA4): `resource_preview` when the lightbox opens, `resource_download` on each download,
 * with `location` ("card" or "lightbox") so the two entry points can be told apart.
 *
 * Props are plain strings rather than arrays/objects, because next-mdx-remote strips JavaScript
 * expressions from component props in article .mdx files — the same reason every other article
 * component here takes string props only.
 */
export function DownloadCard({ title, resource, letter, a4, preview, previewAlt, previewWidth, previewHeight, children }) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const files = [
    letter && { label: 'US Letter', href: letter },
    a4 && { label: 'A4', href: a4 },
  ].filter(Boolean)
  const alt = previewAlt || title

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    const focusables = () => [...(dialogRef.current?.querySelectorAll('button, a[href]') ?? [])]
    focusables()[0]?.focus()
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      } else if (e.key === 'Tab') {
        // Keep focus inside the dialog: close button and the download links.
        const items = focusables()
        if (!items.length) return
        const i = items.indexOf(document.activeElement)
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length
        e.preventDefault()
        items[next].focus()
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

  const openPreview = () => {
    setOpen(true)
    trackEvent('resource_preview', { resource })
  }

  const downloadLinks = (location) =>
    files.map((file) => (
      <a
        key={file.href}
        href={withBasePath(file.href)}
        download
        className="download-card-button"
        onClick={() => trackEvent('resource_download', { resource, paper: file.label, location })}
      >
        Download ({file.label})
      </a>
    ))

  return (
    <div className={`download-card${preview ? ' download-card-has-preview' : ''}`}>
      {preview && (
        <button
          type="button"
          ref={triggerRef}
          onClick={openPreview}
          aria-label={`Preview: ${alt}`}
          className="lightbox-trigger download-card-preview"
        >
          <img src={withBasePath(preview)} alt={alt} width={previewWidth} height={previewHeight} loading="lazy" decoding="async" />
          <span aria-hidden="true" className="lightbox-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M11 8v6M8 11h6" />
            </svg>
            Preview
          </span>
        </button>
      )}

      <div className="download-card-main">
        <p className="download-card-label">Free printable</p>
        <p className="download-card-title">{title}</p>
        {children && <div className="download-card-body">{children}</div>}
        <div className="download-card-actions">{downloadLinks('card')}</div>
      </div>

      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={alt} ref={dialogRef}>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="lightbox-close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="download-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <img src={withBasePath(preview)} alt={alt} width={previewWidth} height={previewHeight} className="download-lightbox-image" />
            <div className="download-card-actions download-lightbox-actions">{downloadLinks('lightbox')}</div>
          </div>
        </div>
      )}
    </div>
  )
}
