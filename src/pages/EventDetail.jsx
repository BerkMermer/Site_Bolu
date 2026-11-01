import { Link, useParams } from 'react-router-dom'
import Button from '../components/Button'
import ErrorMessage from '../components/ErrorMessage'
import EventRegistrationForm from '../components/EventRegistrationForm'
import Loading from '../components/Loading'
import { EVENT_TYPES, pageTitle } from '../config/site'
import { useEvent } from '../hooks/useEvents'
import { formatDateRange, formatWeekday, isUpcoming, toParagraphs } from '../utils/format'

export default function EventDetail() {
  const { id } = useParams()
  const { data: event, loading, error, refetch } = useEvent(id)

  if (loading) {
    return (
      <div className="container section">
        <Loading text="Etkinlik yükleniyor…" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container section">
        <title>{pageTitle('Etkinlik')}</title>
        {error.status === 404 ? (
          <div className="empty-block">
            <h1>Etkinlik bulunamadı</h1>
            <p>Aradığınız etkinlik kaldırılmış veya bağlantı hatalı olabilir.</p>
            <Button to="/etkinlikler">Tüm etkinlikler</Button>
          </div>
        ) : (
          <ErrorMessage error={error} onRetry={refetch} />
        )}
      </div>
    )
  }

  const upcoming = isUpcoming(event)
  const typeLabel = EVENT_TYPES[event.type] ?? event.type
  const gallery = event.gallery ?? []

  return (
    <article>
      <title>{pageTitle(event.title)}</title>

      <header className="page-header">
        <div className="container">
          <nav className="breadcrumb" aria-label="Sayfa konumu">
            <Link to="/etkinlikler">Etkinlikler</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{event.title}</span>
          </nav>
          <div className="event-card__tags">
            <span className="badge">{typeLabel}</span>
            {!upcoming && <span className="badge badge--muted">Tamamlandı</span>}
          </div>
          <h1 className="page-header__title">{event.title}</h1>
          {event.summary && <p className="page-header__description">{event.summary}</p>}
        </div>
      </header>

      <section className="section">
        <div className="container detail-layout">
          <div className="detail-layout__main">
            {event.image_url && (
              <img className="detail-image" src={event.image_url} alt="" width="960" height="540" />
            )}
            <div className="prose">
              {toParagraphs(event.description).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {!upcoming && (
              <section className="gallery" aria-labelledby="gallery-heading">
                <h2 id="gallery-heading">Fotoğraflar</h2>
                {gallery.length ? (
                  <ul className="gallery__grid">
                    {gallery.map((src, i) => (
                      <li key={src}>
                        <a href={src} target="_blank" rel="noopener noreferrer">
                          <img
                            src={src}
                            alt={`${event.title} fotoğrafı ${i + 1}`}
                            loading="lazy"
                            width="400"
                            height="300"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="empty-state">Bu etkinliğin fotoğrafları yakında eklenecek.</p>
                )}
              </section>
            )}
          </div>

          <aside className="detail-layout__aside">
            <div className="info-card">
              <dl className="info-list">
                <div>
                  <dt>Tarih</dt>
                  <dd>
                    {formatDateRange(event.start_date, event.end_date)}
                    <br />
                    <span className="muted">{formatWeekday(event.start_date)}</span>
                  </dd>
                </div>
                {event.location && (
                  <div>
                    <dt>Yer</dt>
                    <dd>{event.location}</dd>
                  </div>
                )}
                {event.capacity > 0 && (
                  <div>
                    <dt>Kontenjan</dt>
                    <dd>{event.capacity} kişi</dd>
                  </div>
                )}
              </dl>
            </div>

            {upcoming && (
              <div className="info-card">
                <h2 className="info-card__title">Kayıt</h2>
                {event.registration_open ? (
                  <EventRegistrationForm eventId={event.id} />
                ) : (
                  <p className="muted">
                    Kayıtlar henüz açılmadı. Açıldığında duyuru kanallarımızdan haber vereceğiz.
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </section>
    </article>
  )
}
