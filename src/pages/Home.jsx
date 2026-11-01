import { Link } from 'react-router-dom'
import AnnouncementCard from '../components/AnnouncementCard'
import Button from '../components/Button'
import DataState from '../components/DataState'
import EventCard from '../components/EventCard'
import Loading from '../components/Loading'
import SectionHeader from '../components/SectionHeader'
import { EVENT_TYPES, SITE, STATS, pageTitle } from '../config/site'
import { useAnnouncements } from '../hooks/useAnnouncements'
import { useEvents } from '../hooks/useEvents'
import { formatDateRange } from '../utils/format'

const ACTIVITIES = [
  {
    title: 'Workshop',
    text: 'Birkaç saatte yeni bir teknolojiyi uygulamalı olarak öğren.',
  },
  {
    title: 'Bootcamp',
    text: 'Haftalara yayılan programlarla bir alanda derinleş.',
  },
  {
    title: 'Hackathon',
    text: 'Takımını kur, fikrini kısa sürede çalışan bir prototipe dönüştür.',
  },
  {
    title: 'Seminer',
    text: 'Sektörden konuşmacılarla kariyer ve teknoloji sohbetleri.',
  },
]

export default function Home() {
  const events = useEvents({ status: 'upcoming', limit: 3 })
  const announcements = useAnnouncements({ limit: 3 })
  const nextEvent = events.data?.[0]

  return (
    <>
      <title>{pageTitle()}</title>

      {/* ---------- Giriş ---------- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow eyebrow--light">{SITE.university}</p>
            <h1 className="hero__title">{SITE.tagline}</h1>
            <p className="hero__lead">{SITE.description}</p>
            <div className="hero__actions">
              <Button to="/katil" variant="light" size="lg">
                Bize Katıl
              </Button>
              <Button to="/etkinlikler" variant="ghost" size="lg">
                Etkinlikleri gör
              </Button>
            </div>
          </div>

          <aside className="hero__card" aria-labelledby="next-event-heading">
            <p className="hero__card-label" id="next-event-heading">
              Sıradaki etkinlik
            </p>
            {events.loading ? (
              <Loading compact />
            ) : nextEvent ? (
              <>
                <span className="badge">{EVENT_TYPES[nextEvent.type] ?? nextEvent.type}</span>
                <h2 className="hero__card-title">{nextEvent.title}</h2>
                <p className="hero__card-meta">
                  {formatDateRange(nextEvent.start_date, nextEvent.end_date)}
                </p>
                {nextEvent.location && <p className="hero__card-meta">{nextEvent.location}</p>}
                <Button to={`/etkinlikler/${nextEvent.id}`} size="sm">
                  Detaylar ve kayıt
                </Button>
              </>
            ) : (
              <p className="hero__card-meta">
                Yeni etkinlikler çok yakında. Duyurular için{' '}
                <Link to="/katil">topluluğa katıl</Link>.
              </p>
            )}
          </aside>
        </div>
      </section>

      {/* ---------- Sayılarla HSD Bolu ---------- */}
      <section className="stats" aria-labelledby="stats-heading">
        <div className="container">
          <h2 id="stats-heading" className="visually-hidden">
            Sayılarla HSD Bolu
          </h2>
          <dl className="stats__grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="stats__item">
                <dt className="stats__label">{stat.label}</dt>
                <dd className="stats__value">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Neler yapıyoruz ---------- */}
      <section className="section" aria-labelledby="activities-heading">
        <div className="container">
          <SectionHeader
            id="activities-heading"
            title="Neler yapıyoruz?"
            description="Her seviyeden öğrenciye açık, uygulamaya dayalı etkinlikler düzenliyoruz."
            linkTo="/hakkimizda"
            linkLabel="Bizi tanı"
          />
          <ul className="feature-grid">
            {ACTIVITIES.map((item) => (
              <li key={item.title} className="feature">
                <h3 className="feature__title">{item.title}</h3>
                <p className="feature__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Yaklaşan etkinlikler ---------- */}
      <section className="section section--alt" aria-labelledby="upcoming-heading">
        <div className="container">
          <SectionHeader id="upcoming-heading" title="Yaklaşan etkinlikler" linkTo="/etkinlikler" />
          <DataState
            loading={events.loading}
            error={events.error}
            onRetry={events.refetch}
            isEmpty={!events.data?.length}
            empty="Şu an planlanmış bir etkinlik yok. Yeni etkinlikler için bizi takip et!"
          >
            <div className="card-grid">
              {events.data?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </DataState>
        </div>
      </section>

      {/* ---------- Duyurular ---------- */}
      <section className="section" aria-labelledby="announcements-heading">
        <div className="container">
          <SectionHeader id="announcements-heading" title="Duyurular" />
          <DataState
            loading={announcements.loading}
            error={announcements.error}
            onRetry={announcements.refetch}
            isEmpty={!announcements.data?.length}
            empty="Henüz duyuru yok."
          >
            <div className="card-grid">
              {announcements.data?.map((item) => (
                <AnnouncementCard key={item.id} announcement={item} />
              ))}
            </div>
          </DataState>
        </div>
      </section>

      {/* ---------- Çağrı ---------- */}
      <section className="section section--tight">
        <div className="container cta-grid">
          <div className="cta cta--primary">
            <h2 className="cta__title">Topluluğa katıl</h2>
            <p>Başvuru formunu doldur, komitelerde görev al, etkinliklerden ilk sen haberdar ol.</p>
            <Button to="/katil" variant="light">
              Başvur
            </Button>
          </div>
          <div className="cta">
            <h2 className="cta__title">Sponsor ve iş birlikleri</h2>
            <p>Etkinliklerimize destek olmak veya ortak etkinlik düzenlemek için bize yazın.</p>
            <Button to="/iletisim?konu=sponsorluk" variant="outline">
              İletişime geç
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
