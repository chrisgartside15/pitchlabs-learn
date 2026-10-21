import { getArticleBySlug } from '@/lib/articles'
import { TOOLS_PUBLISHED, SHOW_TOOLS } from '@/lib/site'
import { getTool } from '@/lib/tools'

/**
 * Renders its children only when what they link to actually exists, so a cross-link added to an older article
 * can never point at a 404 while a release is still in draft.
 *
 *   <IfPublished slug="7v7-soccer-formations" tool>...</IfPublished>
 *
 * `slug`: an article that must be published (a non-underscore .mdx file in content/articles).
 * `tool`: the Tools section must be live (see TOOLS_PUBLISHED in lib/site.js).
 * `toolSlug`: that tool must be released (registered in lib/tools.js and not a `draft`; drafts show in dev only).
 * In `next dev` the tool check passes so the links can be reviewed; the article check always applies.
 */
export function IfPublished({ slug, tool, toolSlug, children }) {
  if (slug && !getArticleBySlug(slug)) return null
  if (toolSlug && (!SHOW_TOOLS || !getTool(toolSlug))) return null
  if (tool && !SHOW_TOOLS) return null
  return <>{children}</>
}
