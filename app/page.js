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
    <main className="home-page">
      <style jsx>{`
        .home-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px 64px 16px;
        }

        .hero {
          text-align: center;
          margin: 80px 0 60px 0;
          animation: fadeIn 0.6s ease-in;
        }

        .hero h1 {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 16px 0;
          color: var(--text-primary);
        }

        .hero p {
          font-size: 18px;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto 32px;
          color: var(--text-secondary);
        }

        .featured-section {
          margin: 80px 0;
        }

        .section-title {
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 32px 0;
          color: var(--text-primary);
        }

        .featured-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 32px;
          margin-bottom: 32px;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .featured-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .featured-content h2 {
          font-size: 28px;
          font-weight: 600;
          margin: 0 0 12px 0;
          line-height: 1.3;
        }

        .featured-content .excerpt {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 20px;
          color: var(--text-secondary);
        }

        .featured-meta {
          display: flex;
          gap: 16px;
          font-size: 14px;
          color: var(--text-tertiary);
          margin-bottom: 20px;
        }

        .read-link {
          display: inline-block;
          padding: 12px 24px;
          background: var(--cta-bg);
          color: var(--cta-text);
          text-decoration: none;
          border-radius: 4px;
          font-weight: 500;
          transition: background 0.2s;
        }

        .read-link:hover {
          background: var(--cta-bg-hover);
        }

        .articles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 32px;
        }

        .article-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          color: inherit;
        }

        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }

        .article-card h3 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 12px 0;
          line-height: 1.4;
          color: var(--text-primary);
        }

        .article-card .excerpt {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .article-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--text-tertiary);
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 32px;
          }

          .hero p {
            font-size: 16px;
          }

          .featured-card {
            grid-template-columns: 1fr;
            padding: 24px;
          }

          .articles-grid {
            grid-template-columns: 1fr;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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
    </main>
  )
}
