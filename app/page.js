import Link from 'next/link'
import { getAllArticles, getArticlesByCluster, formatArticleDate } from '@/lib/articles'
import { CLUSTERS } from '@/lib/clusters'
import { TechEyebrow, PitchDivider } from '@/components/atmosphere'
import { SITE_URL } from '@/lib/site'

export const metadata = {
  title: 'PitchLabs Learn - Coaching Education',
  description: 'Practical, research-backed articles on soccer coaching. From session planning to tactical development, we help coaches build better training and better teams.',
  alternates: { canonical: SITE_URL },
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
        <TechEyebrow>Coaching Education</TechEyebrow>
        <h1>Practical Coaching, Explained</h1>
        <p>
          Research-backed articles on soccer coaching — session planning, tactical development, and the reasoning behind both.
        </p>
      </section>

      <section className="topics-section">
        <h2 className="section-title">Browse by Topic</h2>
        <div className="topics-grid">
          {CLUSTERS.map((cluster) => {
            const count = getArticlesByCluster(cluster.slug).length
            return (
              <Link key={cluster.slug} href={`/topics/${cluster.slug}`} className="topic-card">
                <h3>{cluster.title}</h3>
                <p className="topic-card-goal">{cluster.goal}</p>
                <span className="topic-card-count">
                  {count === 0 ? 'Coming soon' : `${count} article${count === 1 ? '' : 's'}`}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <PitchDivider className="section-divider" />

      {featuredArticle && (
        <section className="featured-section">
          <h2 className="section-title">Featured</h2>
          <div className="featured-card">
            <div className="featured-content">
              <h2>{featuredArticle.meta.title}</h2>
              <div className="featured-meta">
                <span>{formatArticleDate(featuredArticle.meta.date)}</span>
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
          <PitchDivider className="section-divider" />
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
                  <span>{formatArticleDate(article.meta.date)}</span>
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
