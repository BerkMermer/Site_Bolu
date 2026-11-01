import { useSearchParams } from 'react-router-dom'
import DataState from '../components/DataState'
import EventCard from '../components/EventCard'
import PageHeader from '../components/PageHeader'
import { EVENT_TYPES } from '../config/site'
import { useEvents } from '../hooks/useEvents'

// URL'deki Türkçe değer → API'deki status değeri
const TABS = [
  { value: 'yaklasan', status: 'upcoming', label: 'Yaklaşan' },
  { value: 'gecmis', status: 'past', label: 'Geçmiş' },
]

export default function Events() {
  // Filtreler URL'de tutulur: /etkinlikler?durum=gecmis&tur=hackathon
  // Böylece bağlantı paylaşılabilir ve geri tuşu çalışır.
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = TABS.find((t) => t.value === searchParams.get('durum')) ?? TABS[0]
  const type = EVENT_TYPES[searchParams.get('tur')] ? searchParams.get('tur') : ''

  const { data, loading, error, refetch } = useEvents({ status: activeTab.status, type })

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
  }

  const emptyText =
    activeTab.status === 'upcoming'
      ? 'Şu an planlanmış bir etkinlik yok. Yeni etkinlikler için bizi takip et!'
      : 'Bu filtreye uygun geçmiş etkinlik bulunamadı.'

  return (
    <>
      <PageHeader
        eyebrow="Etkinlikler"
        title="Workshop, bootcamp ve hackathonlar"
        description="Yaklaşan etkinliklere kaydol, geçmiş etkinliklerin özetlerine ve fotoğraflarına göz at."
      />

      <section className="section">
        <div className="container">
          <div className="filters">
            <div className="tabs" role="group" aria-label="Etkinlik zamanı">
              {TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  className={`tabs__tab${tab === activeTab ? ' is-active' : ''}`}
                  aria-pressed={tab === activeTab}
                  onClick={() => updateParam('durum', tab === TABS[0] ? '' : tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="chips" role="group" aria-label="Etkinlik türü">
              <button
                type="button"
                className={`chip${!type ? ' is-active' : ''}`}
                aria-pressed={!type}
                onClick={() => updateParam('tur', '')}
              >
                Tümü
              </button>
              {Object.entries(EVENT_TYPES).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`chip${type === value ? ' is-active' : ''}`}
                  aria-pressed={type === value}
                  onClick={() => updateParam('tur', value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <DataState
            loading={loading}
            error={error}
            onRetry={refetch}
            isEmpty={!data?.length}
            empty={emptyText}
          >
            <div className="card-grid">
              {data?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </DataState>
        </div>
      </section>
    </>
  )
}
