import { formatDate } from '../utils/format'

/** Duyuru kartı. url varsa "Devamını oku" bağlantısı gösterilir. */
export default function AnnouncementCard({ announcement }) {
  const { title, summary, published_at: publishedAt, url } = announcement

  return (
    <article className="announcement-card">
      <time className="announcement-card__date" dateTime={publishedAt}>
        {formatDate(publishedAt)}
      </time>
      <h3 className="announcement-card__title">{title}</h3>
      {summary && <p className="announcement-card__summary">{summary}</p>}
      {url && (
        <a className="announcement-card__link" href={url} target="_blank" rel="noopener noreferrer">
          Devamını oku <span className="visually-hidden">: {title}</span>
        </a>
      )}
    </article>
  )
}
