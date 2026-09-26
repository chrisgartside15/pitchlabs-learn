import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticleBySlug, getAllArticles, formatArticleDate, getReadingTimeMinutes } from '@/lib/articles'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { APP_URL } from '@/lib/analytics'
import { PitchDivider } from '@/components/atmosphere'
import { ClusterBadge, SeriesBadge, AuthorBio, GraphicCaption, DefinitionBox, TLDR, MdxLink } from '@/components/content'
import { ImageLightbox } from '@/components/ImageLightbox'
import { StepTool } from '@/components/StepTool'
import { InterventionWheelTool } from '@/components/InterventionWheelTool'
import { CoachingInterventionWheel } from '@/components/CoachingInterventionWheel'
import { SeriesRecap } from '@/components/SeriesRecap'
import { getCluster } from '@/lib/clusters'
import { SITE_URL } from '@/lib/site'

// Spacing/typography/color for these all now live in globals.css (`article h1`, `article a`,
// etc.) so the article reads with the same brand tokens as the rest of the site — no need to
// duplicate that here per-element the way the original template did. GraphicCaption lets an
// article drop `<GraphicCaption />` right under a graphic placeholder in its .mdx source.
const components = {
  GraphicCaption,
  DefinitionBox,
  TLDR,
  ImageLightbox,
  StepTool,
  InterventionWheelTool,
  CoachingInterventionWheel,
  SeriesRecap,
  a: MdxLink,
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  const url = `${SITE_URL}/articles/${params.slug}`
  // Built as a full absolute URL (not a bare "/images/..." path) so it carries the /learn
  // basePath prefix itself — a leading-slash path here would resolve against metadataBase's
  // origin, silently dropping /learn once this app is served through the production proxy.
  const imageUrl = article.meta.image ? `${SITE_URL}${article.meta.image}` : undefined
  // metaTitle/metaDescription are an optional, search-only override for a title/excerpt that
  // runs past what Google's snippet actually shows before truncating (~60 / ~160 characters) —
  // see _ARTICLE_TEMPLATE.mdx. They never touch the on-page H1 or the excerpt shown on article
  // cards, which keep reading `title`/`excerpt` directly further down this file and in
  // lib/articles.js's consumers, so a published article's visible content and frontmatter stay
  // exactly as published — only what search engines see in the snippet gets shortened.
  const seoTitle = article.meta.metaTitle || article.meta.title
  const seoDescription = article.meta.metaDescription || article.meta.excerpt
  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url,
      type: 'article',
      publishedTime: article.meta.date,
      authors: article.meta.author ? [article.meta.author] : undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title: seoTitle,
      description: seoDescription,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()
  const allArticles = getAllArticles()
  const currentIndex = allArticles.findIndex((a) => a.slug === params.slug)
  // getAllArticles() sorts newest-first, so a lower index is newer. "Next" (chronologically
  // forward, and forward through a numbered series like this one) is therefore the previous
  // index, not the next one — the reverse of what array position would suggest. Getting this
  // backwards previously showed a newer part 2 labelled "← " as if it came before part 1.
  const nextArticle = allArticles[currentIndex - 1]
  const prevArticle = allArticles[currentIndex + 1]
  const cluster = article.meta.cluster ? getCluster(article.meta.cluster) : null
  const readingTime = getReadingTimeMinutes(article.content)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.meta.title,
    description: article.meta.metaDescription || article.meta.excerpt,
    datePublished: article.meta.date,
    dateModified: article.meta.date,
    url: `${SITE_URL}/articles/${params.slug}`,
    mainEntityOfPage: `${SITE_URL}/articles/${params.slug}`,
    ...(article.meta.image && { image: `${SITE_URL}${article.meta.image}` }),
    ...(article.meta.author && { author: { '@type': 'Person', name: article.meta.author } }),
    publisher: { '@type': 'Organization', name: 'PitchLabs Learn' },
  }

  // Home > [Topic, if this article has one] > this article — matches the actual back-link/
  // breadcrumb a reader sees at the top of the page, so the SERP rich-result breadcrumb doesn't
  // claim a path the site itself doesn't offer.
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'PitchLabs Learn', item: SITE_URL },
      ...(cluster
        ? [{ '@type': 'ListItem', position: 2, name: cluster.title, item: `${SITE_URL}/topics/${cluster.slug}` }]
        : []),
      {
        '@type': 'ListItem',
        position: cluster ? 3 : 2,
        name: article.meta.title,
        item: `${SITE_URL}/articles/${params.slug}`,
      },
    ],
  }

  return (
    <>
      {/* Article structured data — the search-result rich card (author, date, headline) reads
          this, not the page's visible HTML. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article>
        <div className="article-header">
          {cluster ? (
            <Link href={`/topics/${cluster.slug}`} className="back-link">
              ← Back to {cluster.title}
            </Link>
          ) : (
            <Link href="/articles" className="back-link">
              ← Back to all articles
            </Link>
          )}
          <div className="article-badges">
            {cluster && <ClusterBadge clusterSlug={cluster.slug} />}
            <SeriesBadge
              series={article.meta.series}
              seriesPart={article.meta.seriesPart}
              seriesTotal={article.meta.seriesTotal}
            />
          </div>
          <h1>{article.meta.title}</h1>
          <div className="article-meta">
            <span>{formatArticleDate(article.meta.date)}</span>
            {article.meta.author && <span>· {article.meta.author}</span>}
            <span>· {readingTime} min read</span>
          </div>
        </div>

        <div className="article-content">
          <MDXRemote source={article.content} components={components} />
        </div>

        {article.meta.cta && (
          <div className="article-cta">
            <p>{article.meta.cta}</p>
            <TrackedCtaLink
              href={APP_URL}
              location="article_cta"
              articleSlug={params.slug}
              className="cta-button"
            >
              Build in PitchLabs
            </TrackedCtaLink>
          </div>
        )}

        <AuthorBio author={article.meta.author} />

        {cluster && (
          <Link href={`/topics/${cluster.slug}`} className="more-in-topic">
            More in {cluster.title} →
          </Link>
        )}
      </article>

      {(nextArticle || prevArticle) && (
        <>
          <PitchDivider className="article-nav-divider" />
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
        </>
      )}
    </>
  )
}
