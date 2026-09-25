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
