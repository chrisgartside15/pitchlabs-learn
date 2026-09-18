import './globals.css'

export const metadata = {
  title: 'PitchLabs Learn',
  description: 'Soccer coaching guides and training session planning.',
  openGraph: {
    title: 'PitchLabs Learn',
    description: 'Soccer coaching guides and training session planning.',
    url: 'https://pitchlabs.com/learn',
    siteName: 'PitchLabs Learn',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header className="header">
          <nav className="nav">
            <a href="/" className="logo">
              PitchLabs Learn
            </a>
            <div className="nav-links">
              <a href="/">Home</a>
              <a href="/articles">Articles</a>
              <a href="https://app.pitchlabs.com" target="_blank" rel="noopener noreferrer">
                Build Sessions
              </a>
            </div>
          </nav>
        </header>
        <main className="container">
          {children}
        </main>
        <footer className="footer">
          <p>PitchLabs Learn. Soccer coaching guides for better training sessions.</p>
        </footer>
      </body>
    </html>
  )
}