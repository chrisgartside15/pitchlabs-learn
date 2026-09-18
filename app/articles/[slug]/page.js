import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import Link from 'next/link'

const components = {
  h1: (props) => <h1 style={{ marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
  h2: (props) => <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }} {...props} />,
  h3: (props) => <h3 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }} {...props} />,
  p: (props) => <p style={{ marginBottom: '1rem' }} {...props} />,
  ul: (props) => <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
  ol: (props) => <ol style={{ marginLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
  li: (props) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
  blockquote: (props) => (
    <blockquote
      style={{
        borderLeft: '4px solid #ddd',
        paddingLeft: '1rem',
        marginLeft: 0,
        marginRight: 0,
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        color: '#666',
        fontStyle: 'italic',
      }}
      {...props}
    />
  ),
  code: (props) => (
    <code
      style={{
        background: '#f4f4f4',
        padding: '0.2rem 0.4rem',
        borderRadius: '3px',
        fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
        fontSize: '0.9em',
      }}
      {...props}
    />
  ),
  a: (props) => (
    <a
      style={{
        color: '#1a1a1a',
        textDecoration: 'underline',
      }}
      {...props}
    />
  ),
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  return {
    title: article.meta.title,
    description: article.meta.excerpt,
  }
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)
  const allArticles = getAllArticles()
  const currentIndex = allArticles.findIndex((a) => a.slug === params.slug)
  const nextArticle = allArticles[currentIndex + 1]
  const prevArticle = allArticles[currentIndex - 1]

  return (
    <>
      <article>
        <div className="article-header">
          <Link href="/" className="back-link">
            ← Back to all articles
          </Link>
          <h1>{article.meta.title}</h1>
          <div className="article-meta">
            <span>{new Date(article.meta.date).toLocaleDateString()}</span>
            {article.meta.author && <span> · {article.meta.author}</span>}
          </div>
        </div>

        <div className="article-content">
          <MDXRemote source={article.content} components={components} />
        </div>

        {article.meta.cta && (
          <div className="article-cta">
            <p>{article.meta.cta}</p>
            <a href="https://app.pitchlabs.com" className="cta-button" target="_blank" rel="noopener noreferrer">
              Build in PitchLabs
            </a>
          </div>
        )}
      </article>

      {(nextArticle || prevArticle) && (
        <nav className="article-nav">
          {prevArticle ? (
            <Link href={`/articles/${prevArticle.slug}`} className="nav-link prev">
              ← {prevArticle.meta.title}
            </Link>
          ) : (
            <div />
          )}
          {nextArticle ? (
            <Link href={`/articles/${nextArticle.slug}`} className="nav-link next">
              {nextArticle.meta.title} →
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}

      <style jsx>{`
        .article-header {
          margin-bottom: 3rem;
        }

        .back-link {
          display: inline-block;
          color: #666;
          text-decoration: none;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        .back-link:hover {
          color: #1a1a1a;
        }

        @media (prefers-color-scheme: dark) {
          .back-link {
            color: #aaa;
          }
          .back-link:hover {
            color: #e0e0e0;
          }
        }

        article h1 {
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .article-meta {
          color: #666;
          font-size: 0.95rem;
          margin-top: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e5e5;
        }

        @media (prefers-color-scheme: dark) {
          .article-meta {
            color: #aaa;
            border-bottom-color: #2a2a2a;
          }
        }

        .article-cta {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 6px;
          margin-top: 3rem;
          text-align: center;
        }

        @media (prefers-color-scheme: dark) {
          .article-cta {
            background: #1a1a1a;
          }
        }

        .article-cta p {
          margin-bottom: 1rem;
          font-size: 1.05rem;
        }

        .article-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e5e5;
        }

        @media (prefers-color-scheme: dark) {
          .article-nav {
            border-top-color: #2a2a2a;
          }
        }

        .nav-link {
          padding: 1rem;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          text-decoration: none;
          color: #1a1a1a;
          transition: all 0.2s;
        }

        .nav-link:hover {
          border-color: #1a1a1a;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        @media (prefers-color-scheme: dark) {
          .nav-link {
            border-color: #2a2a2a;
            color: #e0e0e0;
          }
          .nav-link:hover {
            border-color: #e0e0e0;
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
          }
        }

        .nav-link.prev {
          text-align: left;
        }

        .nav-link.next {
          text-align: right;
        }
      `}</style>
    </>
  )
}
