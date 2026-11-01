import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import { SITE } from '../config/site'

// TODO (içerik sorumlusu): Metinler taslaktır; yönetim kurulu onayıyla güncelleyin.

const VALUES = [
  { title: 'Öğrenerek üret', text: 'Teoride kalmayan, elini koda değdiren etkinlikler.' },
  { title: 'Birlikte büyü', text: 'Bölüm ve sınıf fark etmeksizin herkese açık bir topluluk.' },
  { title: 'Paylaş', text: 'Öğrendiğini anlat, başkalarının öğrenmesine katkı sağla.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="Hakkımızda"
        title="HSD Bolu'yu tanıyın"
        description={SITE.description}
      />

      <section className="section">
        <div className="container prose-grid">
          <div className="prose">
            <h2>HSD nedir?</h2>
            <p>
              Huawei Student Developers (HSD), üniversite öğrencilerinin yazılım ve teknoloji
              alanlarında kendilerini geliştirmelerini destekleyen, Huawei tarafından yürütülen
              küresel bir öğrenci topluluğu programıdır. Program kapsamında topluluklar; mobil
              geliştirme, bulut, yapay zekâ ve benzeri alanlarda eğitimler, yarışmalar ve
              buluşmalar düzenler.
            </p>
            <p>
              HSD Bolu, bu programın {SITE.university} bünyesindeki temsilcisidir. Teknolojiye
              ilgi duyan her öğrenci, bölümü ve sınıfı ne olursa olsun topluluğumuza katılabilir.
            </p>
          </div>

          <div className="mission-cards">
            <article className="mission-card">
              <h2 className="mission-card__title">Misyonumuz</h2>
              <p>
                Öğrencilerin güncel teknolojileri uygulamalı olarak öğrenebileceği, proje
                geliştirebileceği ve sektörle tanışabileceği bir ortam oluşturmak.
              </p>
            </article>
            <article className="mission-card">
              <h2 className="mission-card__title">Vizyonumuz</h2>
              <p>
                Bolu'da üreten, paylaşan ve birbirini destekleyen en aktif öğrenci teknoloji
                topluluğu olmak.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="values-heading">
        <div className="container">
          <h2 id="values-heading" className="section-header__title">
            Değerlerimiz
          </h2>
          <ul className="feature-grid feature-grid--3">
            {VALUES.map((v) => (
              <li key={v.title} className="feature">
                <h3 className="feature__title">{v.title}</h3>
                <p className="feature__text">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Üniversite bağlantımız</h2>
          <p>
            HSD Bolu, {SITE.university} öğrencileri tarafından yürütülen bir öğrenci
            topluluğudur. Etkinliklerimizi üniversitemizin fakülte ve birimleriyle iş birliği
            içinde, kampüs olanaklarını kullanarak düzenliyoruz. Akademisyenlerimizin ve
            üniversite birimlerinin ortak etkinlik önerilerine her zaman açığız.
          </p>
          <div className="button-row">
            <Button to="/ekip">Ekibimizle tanış</Button>
            <Button to="/iletisim?konu=is_birligi" variant="outline">
              İş birliği öner
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
