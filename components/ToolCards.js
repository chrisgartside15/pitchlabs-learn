import Link from 'next/link'
import { ALL_TOOL_CARDS } from '@/lib/tools'

/**
 * The tool cards, from the one registry (lib/tools.js). `exclude` drops the tool whose page this is, and `limit`
 * keeps a "more tools" strip short.
 */
export function ToolCards({ exclude, limit }) {
  const cards = ALL_TOOL_CARDS.filter((t) => t.slug !== exclude).slice(0, limit || ALL_TOOL_CARDS.length)
  return (
    <div className="tool-cards">
      {cards.map((tool) => (
        <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-card">
          <span className="tool-card-kind">{tool.kind}</span>
          <h3>{tool.title}</h3>
          <p>{tool.blurb}</p>
        </Link>
      ))}
    </div>
  )
}
