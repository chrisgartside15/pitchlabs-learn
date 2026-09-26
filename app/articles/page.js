import Link from 'next/link'
import { getAllArticles, formatArticleDate } from '@/lib/articles'
import { TechEyebrow } from '@/components/atmosphere'
import { SITE_URL } from '@/lib/site'

export const metadata = {
  title: 'Articles - PitchLabs Learn',
  description: 'All coaching guides and training articles from PitchLabs Learn.',
  alternates: { canonical: `${SITE_URL}/articles` },
}

export default function ArticlesIndex() {
  const articles = getAllArticles()

  return (
    <div className="articles-page">
      <div className="page-header">
        <TechEyebrow>All Articles</TechEyebrow>
        <h1>Coaching guides</h1>
        <p>Every article, newest first.</p>
      </div>

      <div className="articles-grid">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="article-card">
            <h3>{article.meta.title}</h3>
            <p className="excerpt">{article.meta.excerpt}</p>
            <div className="article-meta">
              <span>{formatArticleDate(article.meta.date)}</span>
              <span>{article.meta.author}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* A one- or two-article grid otherwise trails off into a lot of empty page with no
          signal that's expected — this reads as "more guides are coming," not "this page is
          broken," the way the "Coming soon" labels on /topics already do for empty clusters. */}
      {articles.length < 3 && (
        <p className="articles-page-note">
          More coaching guides are in progress — check back soon, or browse{' '}
          <Link href="/topics">topics</Link> to see what&apos;s planned.
        </p>
      )}
    </div>
  )
}
