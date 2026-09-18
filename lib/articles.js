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