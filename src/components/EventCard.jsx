import { Link } from 'react-router-dom'
import { EVENT_TYPES } from '../config/site'
import { dateBadge, formatDateRange, isUpcoming } from '../utils/format'

/**
 * Etkinlik kartı: ana sayfada ve etkinlikler sayfasında aynı component kullanılır.
 * Kartın tamamı tıklanabilir (başlıktaki bağlantı kartı kaplar).
 */
export default function EventCard({ event }) {
  const typeLabel = EVENT_TYPES[event.type] ?? event.type
  const upcoming = isUpcoming(event)
  const badge = dateBadge(event.start_date)

  return (
    <article className={`event-card${upcoming ? '' : ' event-card--past'}`}>
      <div className="event-card__media">
        {event.image_url ? (
          <img src={event.image_url} alt="" loading="lazy" width="640" height="360" />
        ) : (
          <div className={`event-card__placeholder event-card__placeholder--${event.type}`} aria-hidden="true">
            <span>{typeLabel}</span>
          </div>
        )}
        {badge && (
          <div className="event-card__date" aria-hidden="true">
            <span className="event-card__day">{badge.day}</span>
            <span className="event-card__month">{badge.month}</span>
          </div>
        )}
      </div>

      <div className="event-card__body">
        <div className="event-card__tags">
          <span className="badge">{typeLabel}</span>
          {!upcoming && <span className="badge badge--muted">Tamamlandı</span>}
          {upcoming && event.registration_open && <span className="badge badge--success">Kayıt açık</span>}
        </div>

        <h3 className="event-card__title">
          <Link to={`/etkinlikler/${event.id}`} className="stretched-link">
            {event.title}
          </Link>
        </h3>

        <ul className="event-card__meta">
          <li>
            <span className="visually-hidden">Tarih: </span>
            <time dateTime={event.start_date}>{formatDateRange(event.start_date, event.end_date)}</time>
          </li>
          {event.location && (
            <li>
              <span className="visually-hidden">Yer: </span>
              {event.location}
            </li>
          )}
        </ul>

        {event.summary && <p className="event-card__summary">{event.summary}</p>}
      </div>
    </article>
  )
}
