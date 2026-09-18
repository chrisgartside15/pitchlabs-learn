import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getAllArticles() {
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticles = fileNames.map((fileName) => {
    const slug = fileName.replace(/.mdx?$/, '')
    return getArticleBySlug(slug)
  })

  return allArticles.sort((a, b) => new Date(b.date) - new Date(a.date))
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