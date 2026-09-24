import { Suspense } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { GA_MEASUREMENT_ID, APP_URL } from '@/lib/analytics'
import { SITE_URL } from '@/lib/site'
import { GoogleAnalyticsPageTracker } from '@/components/GoogleAnalyticsPageTracker'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'

// Same brand type pairing as the main PitchLabs marketing site: Sora for display headlines,
// Inter for body copy, JetBrains Mono for the small scoreboard-style labels (eyebrows, byline/
// read-time). Scoped via CSS variables so globals.css controls where each is actually applied.
const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = {
  // Lets every page's relative OG/Twitter image and canonical URLs resolve to a real absolute
  // URL instead of silently resolving against whatever host actually served the request (wrong
  // in preview deployments, and a documented Next.js warning without this set at all).
  metadataBase: new URL(SITE_URL),
  title: 'PitchLabs Learn',
  description: 'Soccer coaching guides and training session planning.',
  openGraph: {
    title: 'PitchLabs Learn',
    description: 'Soccer coaching guides and training session planning.',
    url: SITE_URL,
    siteName: 'PitchLabs Learn',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header className="header">
          <nav className="nav">
            <Link href="/" className="logo">
              PitchLabs <span className="logo-accent">Learn</span>
            </Link>
            <div className="nav-links">
              <Link href="/topics">Topics</Link>
              <Link href="/articles">Articles</Link>
              <TrackedCtaLink href={APP_URL} location="nav" className="nav-cta">
                Build Sessions
              </TrackedCtaLink>
            </div>
          </nav>
        </header>
        <main className="container">
          {children}
        </main>
        <footer className="footer">
          <div className="footer-inner">
            <p>© {new Date().getFullYear()} PitchLabs. Coaching education for better training sessions.</p>
            <TrackedCtaLink href={APP_URL} location="footer" className="footer-link">
              Build Sessions →
            </TrackedCtaLink>
          </div>
        </footer>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            {/* GA4 bootstrap: expose window.gtag for lib/analytics + the page tracker; config sends
                the first page_view with path. Mirrors the main PitchLabs app's layout snippet. */}
            <Script id="google-tag-inline" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname + window.location.search });
              `}
            </Script>
            <Suspense fallback={null}>
              <GoogleAnalyticsPageTracker />
            </Suspense>
          </>
        ) : null}
      </body>
    </html>
  )
}