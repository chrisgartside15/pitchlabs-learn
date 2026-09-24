import Link from 'next/link'

export const metadata = {
  title: 'Page not found - PitchLabs Learn',
}

export default function NotFound() {
  return (
    <div className="not-found-page">
      <p className="not-found-code">404</p>
      <h1>That page doesn&rsquo;t exist</h1>
      <p>
        The link might be old, or the page might have moved. Try one of these instead:
      </p>
      <div className="not-found-links">
        <Link href="/" className="cta-button">
          Go home
        </Link>
        <Link href="/articles" className="not-found-secondary">
          Browse articles →
        </Link>
        <Link href="/topics" className="not-found-secondary">
          Browse topics →
        </Link>
      </div>
    </div>
  )
}
