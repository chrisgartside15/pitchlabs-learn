'use client'

import { useEffect } from 'react'
import { captureFirstTouch } from '@/lib/firstTouch'

/** Remembers where the visitor first came from (once), for signup attribution in the app. Renders nothing. */
export function FirstTouchCapture() {
  useEffect(() => {
    try {
      captureFirstTouch(window.localStorage, window.location.href, document.referrer)
    } catch {
      // storage blocked (private mode etc.): no attribution, nothing else affected
    }
  }, [])
  return null
}
