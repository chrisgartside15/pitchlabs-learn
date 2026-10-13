import { notFound } from 'next/navigation'
import { TechEyebrow } from '@/components/atmosphere'
import { ToolCards } from '@/components/ToolCards'
import { ALL_TOOL_CARDS } from '@/lib/tools'
import { SITE_URL, SHOW_TOOLS, TOOLS_PUBLISHED } from '@/lib/site'

export const metadata = {
  title: 'Free Soccer Coaching Tools - PitchLabs Learn',
  description:
    'Free interactive tools for soccer coaches: a 7v7 formation builder with a squad rotation planner, a small-sided game splitter, the STEP framework, a session audit and more.',
  alternates: { canonical: `${SITE_URL}/tools` },
  // Indexable only once the Tools section is released (TOOLS_PUBLISHED in lib/site.js).
  robots: TOOLS_PUBLISHED ? { index: true, follow: true } : { index: false, follow: false },
}

export default function ToolsIndex() {
  if (!SHOW_TOOLS) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free soccer coaching tools',
    itemListElement: ALL_TOOL_CARDS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.title,
      url: `${SITE_URL}/tools/${t.slug}`,
    })),
  }

  return (
    <div className="articles-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page-header">
        <TechEyebrow>Free tools</TechEyebrow>
        <h1>Tools</h1>
        <p>Free, interactive tools for coaches. No sign-up, nothing to install, and each one says where it comes from.</p>
      </div>

      <h2 className="sr-only">All tools</h2>
      <ToolCards />
    </div>
  )
}
