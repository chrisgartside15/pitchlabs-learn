import { getAllArticles } from '@/lib/articles'
import { CLUSTERS } from '@/lib/clusters'
import { SITE_URL } from '@/lib/site'

export default function sitemap() {
  const articles = getAllArticles()

  const staticRoutes = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/articles`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/topics`, changeFrequency: 'monthly', priority: 0.8 },
  ]

  const topicRoutes = CLUSTERS.map((cluster) => ({
    url: `${SITE_URL}/topics/${cluster.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: article.meta.date,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...topicRoutes, ...articleRoutes]
}
