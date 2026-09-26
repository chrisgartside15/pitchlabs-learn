import { getAllArticles, getArticlesByCluster } from '@/lib/articles'
import { CLUSTERS } from '@/lib/clusters'
import { SITE_URL } from '@/lib/site'

export default function sitemap() {
  const articles = getAllArticles()
  // Newest first (getAllArticles' own sort), so [0] is the most recently published article —
  // used as the lastModified signal for pages that aggregate all articles.
  const latestDate = articles[0]?.meta.date

  const staticRoutes = [
    { url: SITE_URL, lastModified: latestDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/articles`, lastModified: latestDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/topics`, lastModified: latestDate, changeFrequency: 'monthly', priority: 0.8 },
  ]

  // Clusters with no articles yet ("Coming soon" on /topics) are real pages but have nothing on
  // them worth crawling yet — leaving them out of the sitemap avoids submitting thin/empty pages
  // to Google while they're still placeholders. They stay reachable via the /topics nav; this
  // only affects what's proactively pushed for indexing.
  const topicRoutes = CLUSTERS.map((cluster) => ({ cluster, clusterArticles: getArticlesByCluster(cluster.slug) }))
    .filter(({ clusterArticles }) => clusterArticles.length > 0)
    .map(({ cluster, clusterArticles }) => ({
      url: `${SITE_URL}/topics/${cluster.slug}`,
      lastModified: clusterArticles[0].meta.date,
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
