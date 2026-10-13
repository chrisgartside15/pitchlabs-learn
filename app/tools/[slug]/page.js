import Link from 'next/link'
import { notFound } from 'next/navigation'
import { TOOLS, getTool } from '@/lib/tools'
import { getArticleBySlug } from '@/lib/articles'
import { TechEyebrow } from '@/components/atmosphere'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'
import { ToolCards } from '@/components/ToolCards'
import { APP_URL } from '@/lib/analytics'
import { SITE_URL, SHOW_TOOLS, TOOLS_PUBLISHED } from '@/lib/site'
import { GameSplitter } from '@/components/GameSplitter'
import { StepTool } from '@/components/StepTool'
import { SessionAudit } from '@/components/SessionAudit'
import { CouldntOrDidnt } from '@/components/CouldntOrDidnt'
import { InterventionWheelTool } from '@/components/InterventionWheelTool'
import { CoachingInterventionWheel } from '@/components/CoachingInterventionWheel'

// The same components that sit inside the articles, shown on their own.
const COMPONENTS = {
  GameSplitter,
  StepTool,
  SessionAudit,
  CouldntOrDidnt,
  InterventionWheelTool,
  CoachingInterventionWheel,
}

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }) {
  const tool = getTool(params.slug)
  if (!tool) return {}
  return {
    title: `${tool.metaTitle} - PitchLabs Learn`,
    description: tool.description,
    alternates: { canonical: `${SITE_URL}/tools/${tool.slug}` },
    // Indexable only once the Tools section is released (TOOLS_PUBLISHED in lib/site.js).
    robots: TOOLS_PUBLISHED ? { index: true, follow: true } : { index: false, follow: false },
  }
}

export default function ToolPage({ params }) {
  const tool = getTool(params.slug)
  if (!tool || !SHOW_TOOLS) notFound()

  const Tool = COMPONENTS[tool.component]
  const article = getArticleBySlug(tool.articleSlug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: `${SITE_URL}/tools/${tool.slug}`,
    description: tool.description,
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Any (web browser)',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'PitchLabs', url: 'https://www.usepitchlabs.com' },
  }

  return (
    <div className="articles-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-header">
        <Link href="/tools" className="back-link">
          ← All tools
        </Link>
        <TechEyebrow>Free tool</TechEyebrow>
        <h1>{tool.title}</h1>
        <p>{tool.blurb}</p>
      </div>

      <Tool />

      <article className="tool-notes">
        <h2>How to use it</h2>
        <ul>
          {tool.how.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h2>Where it comes from</h2>
        <p>{tool.note}</p>
        {article && (
          <p>
            The thinking, sources and caveats are in{' '}
            <Link href={`/articles/${article.slug}`}>{article.meta.title}</Link>.
          </p>
        )}

        <div className="tool-cta">
          <p>
            Like how it works? PitchLabs is where you build the whole session: the activities, the diagrams, the plan
            you take pitchside.
          </p>
          <TrackedCtaLink href={APP_URL} location={`tool_${tool.slug}`} className="nav-cta">
            Plan a session in PitchLabs
          </TrackedCtaLink>
        </div>

        <h2>More free tools</h2>
      </article>
      <ToolCards exclude={tool.slug} limit={3} />
    </div>
  )
}
