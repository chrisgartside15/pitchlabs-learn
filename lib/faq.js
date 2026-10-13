/**
 * Pulls the visible "Common questions" block out of an article's MDX so it can also be emitted as FAQPage
 * structured data. Opt-in per article (`faqSchema: true` in frontmatter), and built from the visible text only, so
 * the markup can never say something the page doesn't. Format it reads:
 *
 *   ## Common questions about ...
 *   **A question?**
 *   The answer, one or more lines.
 *   (blank line, next **question**, ... until a `---` rule, the next `##`, or the end)
 */
const plain = (t) =>
  t
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

export function extractFaq(content) {
  const start = content.search(/^## Common questions[^\n]*$/m)
  if (start < 0) return []
  const rest = content.slice(start).split('\n').slice(1)
  const items = []
  let cur = null
  for (const line of rest) {
    if (/^---\s*$/.test(line) || /^## /.test(line)) break
    const q = line.match(/^\*\*(.+)\*\*\s*$/)
    if (q) {
      cur = { q: plain(q[1]), a: [] }
      items.push(cur)
    } else if (cur) {
      cur.a.push(line)
    }
  }
  return items
    .map((i) => ({ q: i.q, a: plain(i.a.join(' ')) }))
    .filter((i) => i.q && i.a)
}

export function faqJsonLd(content) {
  const items = extractFaq(content)
  if (items.length < 2) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}
