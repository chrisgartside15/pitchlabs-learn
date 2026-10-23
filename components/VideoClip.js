import { withBasePath } from '@/lib/site'

/**
 * A short Animate export shown inline in an article. `clip` is the file name without extension in
 * public/videos/articles/. Portrait clips are capped in width so a 9:16 reel doesn't fill the column.
 * `title` is the accessible label; `poster` is optional (the browser shows the first frame without it).
 */
export function VideoClip({ clip, title, poster, caption }) {
  return (
    <figure className="video-clip">
      <video
        controls
        playsInline
        loop
        preload="metadata"
        aria-label={title}
        poster={poster ? withBasePath(poster) : undefined}
      >
        <source src={withBasePath(`/videos/articles/${clip}.mp4`)} type="video/mp4" />
      </video>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
