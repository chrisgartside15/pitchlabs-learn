import Link from 'next/link'
import { getCluster } from '@/lib/clusters'
import { APP_URL } from '@/lib/analytics'
import { TrackedCtaLink } from '@/components/TrackedCtaLink'

/** Registered as the `a` override for every markdown-syntax link inside article .mdx content
 *  (research citations, the cross-article series links). Without this, MDXRemote renders a plain
 *  `<a>`, which — unlike next/link — doesn't pick up basePath automatically, so an internal link
 *  like `[next piece](/articles/...)` would point at the un-prefixed path once this app is
 *  actually served under the /learn proxy in production. External links (the citations) stay as
 *  plain anchors that open in a new tab, same as before. */
export function MdxLink({ href = '', children, ...rest }) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  )
}

/** Category pill linking to the article's cluster landing page (/topics/<cluster>) — the
 *  Ahrefs/Canva-style "this belongs to a pillar, not a random post" signal. */
export function ClusterBadge({ clusterSlug }) {
  const cluster = getCluster(clusterSlug)
  if (!cluster) return null
  return (
    <Link href={`/topics/${cluster.slug}`} className="cluster-badge">
      {cluster.title}
    </Link>
  )
}

/** Plain (non-link) label for an article's place in a numbered series — deliberately styled
 *  differently from ClusterBadge (a clickable pill) rather than just placed next to it, so the
 *  two read as two different kinds of information at a glance: cluster = what this piece is
 *  about, series = where it sits in a sequence. A series can span multiple clusters (see
 *  articles 1 and 3 vs. article 2 in "What Actually Shapes a Youth Practice") without the two
 *  badges implying they should match. */
export function SeriesBadge({ series, seriesPart, seriesTotal }) {
  if (!series || !seriesPart || !seriesTotal) return null
  return (
    <span className="series-badge">
      <span aria-hidden="true" className="series-badge-tick" />
      Part {seriesPart} of {seriesTotal} · {series}
    </span>
  )
}

/** A short "read this if nothing else" summary, placed at the top of an article before the
 *  narrative opening — for a skimmer who wants the point in the time it takes to read four or
 *  five bullets, not the full piece. Deliberately styled differently from DefinitionBox (a top
 *  border instead of a left one, a plain box instead of an accent-colored one) so the two don't
 *  read as the same kind of callout — this one's a summary, not a definition. If the article is
 *  part of a series, the "catch up" line pointing at earlier parts goes here too, as the last
 *  line inside the box, rather than as a separate element — keeps the top of the article to one
 *  callout instead of two. */
export function TLDR({ children }) {
  return (
    <div className="tldr-box">
      <p className="tldr-label">30-Second Version</p>
      <div className="tldr-body">{children}</div>
    </div>
  )
}

/** A highlighted "what this term means" callout — the Coaches' Voice pattern of stating a clear
 *  definition before building on it, rather than assuming the reader already knows the jargon.
 *  Usage in an article: wrap it around the term's own explanation, right where it's introduced. */
export function DefinitionBox({ term, children }) {
  return (
    <div className="definition-box">
      <p className="definition-term">{term}</p>
      <div className="definition-body">{children}</div>
    </div>
  )
}

/** Parses the frontmatter `author` string's "Name, Credentials" convention (see
 *  _ARTICLE_TEMPLATE.mdx) into a name + credentials line for the end-of-article credibility card.
 *  Falls back to showing the whole string as the name if there's no comma to split on. */
function splitAuthor(authorString) {
  const commaIndex = authorString.indexOf(',')
  if (commaIndex === -1) return { name: authorString, credentials: null }
  return {
    name: authorString.slice(0, commaIndex).trim(),
    credentials: authorString.slice(commaIndex + 1).trim(),
  }
}

/** Small caption under a graphic placeholder — the Canva Learn pattern of a quiet, in-context
 *  path back into the product right where the content demonstrates the need for it, rather than
 *  saving every product mention for one CTA block at the very end. Deliberately understated: a
 *  caption-sized link, not a button. */
export function GraphicCaption({ articleSlug }) {
  return (
    <TrackedCtaLink
      href={APP_URL}
      location="graphic_caption"
      articleSlug={articleSlug}
      className="graphic-caption-link"
    >
      Diagrams like this are built in PitchLabs →
    </TrackedCtaLink>
  )
}

/** End-of-article author credibility card — Ahrefs' "author credibility" pattern: readers (and
 *  Google) trust content more when a real, credentialed person visibly stands behind it. */
export function AuthorBio({ author }) {
  if (!author) return null
  const { name, credentials } = splitAuthor(author)
  return (
    <div className="author-bio">
      <div className="author-bio-avatar" aria-hidden="true">
        {name.charAt(0)}
      </div>
      <div className="author-bio-text">
        <p className="author-bio-name">{name}</p>
        {credentials && <p className="author-bio-credentials">{credentials}</p>}
      </div>
    </div>
  )
}
