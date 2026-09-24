import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getAllArticles() {
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticles = fileNames
    // Skip the template and any dotfiles/non-mdx files - these aren't real articles
    .filter((fileName) => fileName.endsWith('.mdx') && !fileName.startsWith('_'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      return getArticleBySlug(slug)
    })

  return allArticles.sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date))
}

export function getArticleBySlug(slug) {
  const realSlug = slug.replace(/.mdx?$/, '')
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    meta: data,
    content,
  }
}

/** Articles tagged with a given cluster slug (see lib/clusters.js), newest first. */
export function getArticlesByCluster(clusterSlug) {
  return getAllArticles().filter((article) => article.meta.cluster === clusterSlug)
}

/**
 * Formats a frontmatter `date: "YYYY-MM-DD"` string for display. `new Date("2026-09-18")` parses
 * that as UTC midnight, and `.toLocaleDateString()` then renders it in the *browser's* timezone —
 * in any US timezone (all of them are behind UTC), that rolls the date back to the previous day
 * (a "2026-09-18" article displayed "9/17/2026" for a Mountain-time reader). Splitting the string
 * and constructing the Date from local-time components sidesteps the UTC conversion entirely, so
 * the date shown always matches what's actually in the article's frontmatter.
 */
export function formatArticleDate(dateStr, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', options)
}