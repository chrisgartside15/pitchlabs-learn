/**
 * "In this guide" contents list, built from the article's h2 headings (see lib/toc.js). Rendered only by the
 * article template, and only when there are TOC_MIN_HEADINGS or more. A native <details> so a phone reader can fold it.
 */
export function ArticleToc({ headings }) {
  return (
    <details className="article-toc" open>
      <summary>In this guide</summary>
      <nav aria-label="In this guide">
        <ol>
          {headings.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  )
}
