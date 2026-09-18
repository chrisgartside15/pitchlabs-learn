import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export const metadata = {
  title: 'PitchLabs Learn - Coaching Education',
  description: 'Practical, research-backed articles on soccer coaching. From session planning to tactical development, we help coaches build better training and better teams.',
  openGraph: {
    title: 'PitchLabs Learn',
    description: 'Practical, research-backed articles on soccer coaching.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PitchLabs Learn',
    description: 'Practical coaching education.',
  },
}

export default function Home() {
  const articles = getAllArticles()
  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <div className="home-page">

      <section className="hero">
        <h1>Coaching Education, Done Right</h1>
        <p>
          Practical, research-backed articles on soccer coaching. From session planning to tactical development, we help coaches build better training and better teams.
        </p>
      </section>

      {featuredArticle && (
        <section className="featured-section">
          <h2 className="section-title">Featured</h2>
          <div className="featured-card">
            <div className="featured-content">
              <h2>{featuredArticle.meta.title}</h2>
              <div className="featured-meta">
                <span>{new Date(featuredArticle.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>{featuredArticle.meta.author}</span>
              </div>
              <p className="excerpt">{featuredArticle.meta.excerpt}</p>
              <Link href={`/articles/${featuredArticle.slug}`} className="read-link">
                Read Article →
              </Link>
            </div>
          </div>
        </section>
      )}

      {otherArticles.length > 0 && (
        <section>
          <h2 className="section-title">All Articles</h2>
          <div className="articles-grid">
            {otherArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="article-card"
              >
                <h3>{article.meta.title}</h3>
                <p className="excerpt">{article.meta.excerpt}</p>
                <div className="article-meta">
                  <span>{new Date(article.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>{article.meta.author}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
