import AnnouncementCard from '../components/AnnouncementCard'
import Button from '../components/Button'
import DataState from '../components/DataState'
import EventCard from '../components/EventCard'
import HeroShowcase from '../components/HeroShowcase'
import SectionHeader from '../components/SectionHeader'
import { pageTitle } from '../config/site'
import { useAnnouncements } from '../hooks/useAnnouncements'
import { useEvents } from '../hooks/useEvents'

const ACTIVITIES = [
  {
    title: 'Teknik Eğitimler',
    text: 'Yapay zeka, mobil, bulut ve siber güvenlik alanlarında uygulamalı atölyeler ve eğitim serileri.',
  },
  {
    title: 'Projeler',
    text: 'Öğrenci ekipleriyle açık kaynak, Ar-Ge ve yarışma odaklı gerçek dünya yazılımları geliştirme.',
  },
  {
    title: 'Eğlenceli Etkinlikler',
    text: 'Topluluk buluşmaları, oyun geceleri, networking sohbetleri ve kampüs içi sosyal etkinlikler.',
  },
]

export default function Home() {
  const events = useEvents({ status: 'upcoming', limit: 3 })
  const announcements = useAnnouncements({ limit: 3 })

  return (
    <>
      <title>{pageTitle()}</title>

      <HeroShowcase />

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
