import Link from 'next/link'
import { CLUSTERS } from '@/lib/clusters'
import { getArticlesByCluster } from '@/lib/articles'
import { TechEyebrow } from '@/components/atmosphere'

export const metadata = {
  title: 'Topics - PitchLabs Learn',
  description: 'Coaching education organized by topic: session planning, coaching principles, age-specific training, and more.',
}

export default function TopicsIndex() {
  return (
    <div className="articles-page">
      <div className="page-header">
        <TechEyebrow>Browse by Topic</TechEyebrow>
        <h1>Topics</h1>
        <p>Coaching education organized into a few deep pillars, not a random stream of posts.</p>
      </div>

      <div className="topics-grid">
        {CLUSTERS.map((cluster) => {
          const count = getArticlesByCluster(cluster.slug).length
          return (
            <Link key={cluster.slug} href={`/topics/${cluster.slug}`} className="topic-card">
              <h3>{cluster.title}</h3>
              <p className="topic-card-goal">{cluster.goal}</p>
              <span className="topic-card-count">
                {count === 0 ? 'Coming soon' : `${count} article${count === 1 ? '' : 's'}`}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
