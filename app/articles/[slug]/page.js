import { MDXRemote } from 'next-mdx-remote/rsc'
import { getArticleBySlug, getAllArticles, formatArticleDate } from '@/lib/articles'
import Link from 'next/link'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { APP_URL } from '@/lib/analytics'
import { PitchDivider } from '@/components/atmosphere'
import { ClusterBadge, AuthorBio, GraphicCaption, DefinitionBox } from '@/components/content'
import { ImageLightbox } from '@/components/ImageLightbox'
import { StepTool } from '@/components/StepTool'
import { InterventionWheelTool } from '@/components/InterventionWheelTool'
import { getCluster } from '@/lib/clusters'

// Spacing/typography/color for these all now live in globals.css (`article h1`, `article a`,
// etc.) so the article reads with the same brand tokens as the rest of the site — no need to
// duplicate that here per-element the way the original template did. GraphicCaption lets an
// article drop `<GraphicCaption />` right under a graphic placeholder in its .mdx source.
const components = { GraphicCaption, DefinitionBox, ImageLightbox, StepTool, InterventionWheelTool }

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
  const cluster = article.meta.cluster ? getCluster(article.meta.cluster) : null

  return (
    <>
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
          {cluster && <ClusterBadge clusterSlug={cluster.slug} />}
          <h1>{article.meta.title}</h1>
          <div className="article-meta">
            <span>{formatArticleDate(article.meta.date)}</span>
            {article.meta.author && <span>· {article.meta.author}</span>}
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
