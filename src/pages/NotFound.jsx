import Button from '../components/Button'
import { pageTitle } from '../config/site'

export default function NotFound() {
  return (
    <section className="section">
      <title>{pageTitle('Sayfa bulunamadı')}</title>
      <div className="container empty-block">
        <p className="empty-block__code" aria-hidden="true">
          404
        </p>
        <h1>Sayfa bulunamadı</h1>
        <p>Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.</p>
        <div className="button-row button-row--center">
          <Button to="/">Ana sayfaya dön</Button>
          <Button to="/etkinlikler" variant="outline">
            Etkinlikler
          </Button>
        </div>
      </div>
    </section>
  )
}
