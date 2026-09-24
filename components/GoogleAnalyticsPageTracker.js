'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview } from '@/lib/analytics'

export function GoogleAnalyticsPageTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const isFirstNavigation = useRef(true)

  useEffect(() => {
    const url = search ? `${pathname}?${search}` : pathname
    // Google's inline gtag('config', id) in the layout already records the first page_view.
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false
      return
    }
    pageview(url)
  }, [pathname, search])

  return null
}
