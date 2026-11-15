/**
 * Contents list for long articles. Headings come from the article's own `## ` lines (never edited), and ids are
 * generated here and by the h2 override in app/articles/[slug]/page.js with the same rules, so the two always agree.
 * Nothing in content/articles is touched.
 */
export const TOC_MIN_HEADINGS = 5

export function slugifyHeading(text) {
  return (
    String(text)
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[‘’'’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'section'
  )
}

/** Returns a function that gives each heading text a unique id, in document order (repeats get -2, -3...). */
export function createIdMaker() {
  const seen = new Map()
  return (text) => {
    const base = slugifyHeading(text)
    const n = (seen.get(base) || 0) + 1
    seen.set(base, n)
    return n === 1 ? base : `${base}-${n}`
  }
}

function stripInlineMarkdown(s) {
  return s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`]/g, '')
    .replace(/\s*\{#[^}]*\}\s*$/, '')
    .trim()
}

/** `## ` headings outside code fences, as [{ text, id }]. */
export function extractH2s(markdown) {
  const makeId = createIdMaker()
  const out = []
  let fence = null
  for (const line of String(markdown).split('\n')) {
    const f = line.match(/^\s*(```|~~~)/)
    if (f) {
      fence = fence ? (fence === f[1] ? null : fence) : f[1]
      continue
    }
    if (fence) continue
    const m = line.match(/^##\s+(.+?)\s*#*\s*$/)
    if (!m) continue
    const text = stripInlineMarkdown(m[1])
    if (text) out.push({ text, id: makeId(text) })
  }
  return out
}

/** Plain text of rendered React children (strings, numbers, nested elements). */
export function childrenText(children) {
  if (children == null || typeof children === 'boolean') return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(childrenText).join('')
  if (children.props) return childrenText(children.props.children)
  return ''
}
