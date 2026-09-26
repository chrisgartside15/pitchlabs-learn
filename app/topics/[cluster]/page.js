import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CLUSTERS, getCluster } from '@/lib/clusters'
import { getArticlesByCluster, getArticleBySlug, formatArticleDate } from '@/lib/articles'
import { PitchDivider } from '@/components/atmosphere'
import { SITE_URL } from '@/lib/site'

export async function generateStaticParams() {
  return CLUSTERS.map((cluster) => ({ cluster: cluster.slug }))
}

export async function generateMetadata({ params }) {
  const cluster = getCluster(params.cluster)
  if (!cluster) return {}
  return {
    title: `${cluster.title} - PitchLabs Learn`,
    description: cluster.goal,
    alternates: { canonical: `${SITE_URL}/topics/${cluster.slug}` },
  }
}

export default function ClusterPage({ params }) {
  const cluster = getCluster(params.cluster)
  if (!cluster) notFound()

  const articles = getArticlesByCluster(cluster.slug)
  const pillar = cluster.pillarSlug ? getArticleBySlug(cluster.pillarSlug) : null
  const supporting = articles.filter((a) => a.slug !== cluster.pillarSlug)

  // Matches the "← All topics" back-link a reader actually sees above the h1.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'PitchLabs Learn', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Topics', item: `${SITE_URL}/topics` },
      { '@type': 'ListItem', position: 3, name: cluster.title, item: `${SITE_URL}/topics/${cluster.slug}` },
    ],
  }

  return (
    <div className="articles-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="page-header">
        <Link href="/topics" className="back-link">
          ← All topics
        </Link>
        <h1>{cluster.title}</h1>
        <p>{cluster.goal}</p>
      </div>

      <section className="pillar-slot">
        <p className="pillar-slot-label">Pillar guide</p>
        {pillar ? (
          <Link href={`/articles/${pillar.slug}`} className="article-card pillar-card">
            <h3>{pillar.meta.title}</h3>
            <p className="excerpt">{pillar.meta.excerpt}</p>
          </Link>
        ) : articles.length > 0 ? (
          <p className="pillar-slot-empty">
            The foundational guide for this topic hasn&rsquo;t been published yet.
          </p>
        ) : (
          // Cluster has nothing at all yet — one message covering both the pillar and
          // supporting slots, rather than stacking this with the "no articles" message below.
          <p className="pillar-slot-empty">
            No articles published in this topic yet — check back soon.
          </p>
        )}
      </section>

      {supporting.length > 0 && (
        <>
          <PitchDivider className="section-divider" />
          <h2 className="section-title">Supporting articles</h2>
          <div className="articles-grid">
            {supporting.map((article) => (
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
        </>
      )}
    </div>
  )
}
