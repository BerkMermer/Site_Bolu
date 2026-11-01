import { useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import { Input, Select, TextArea } from '../components/FormFields'
import FormStatus from '../components/FormStatus'
import KvkkConsent from '../components/KvkkConsent'
import PageHeader from '../components/PageHeader'
import { CONTACT_SUBJECTS, ORGANIZATION_SUBJECTS, SITE, SOCIAL_LINKS } from '../config/site'
import { useForm } from '../hooks/useForm'
import { sendContactMessage } from '../services/api'

export default function Contact() {
  // /iletisim?konu=sponsorluk gibi bağlantılarla konu önceden seçili gelir.
  const [searchParams] = useSearchParams()
  const presetSubject = CONTACT_SUBJECTS.some((s) => s.value === searchParams.get('konu'))
    ? searchParams.get('konu')
    : ''

  const form = useForm(
    {
      full_name: '',
      email: '',
      subject: presetSubject,
      organization: '',
      message: '',
      kvkk_consent: false,
    },
    sendContactMessage,
  )
  const { values, errors, handleChange } = form
  const showOrganization = ORGANIZATION_SUBJECTS.includes(values.subject)
  const socials = SOCIAL_LINKS.filter((s) => s.url)

  return (
    <>
      <PageHeader
        eyebrow="İletişim"
        title="Bize ulaşın"
        description="Sorularınız, sponsorluk ve iş birliği teklifleriniz için formu doldurun ya da doğrudan e-posta gönderin."
      />

      <section className="section">
        <div className="container join-layout">
          <div className="form-card">
            <h2 className="form-card__title">İletişim formu</h2>
            <form className="form" onSubmit={form.handleSubmit} noValidate>
              <div className="form__row">
                <Input
                  label="Ad soyad"
                  name="full_name"
                  autoComplete="name"
                  required
                  value={values.full_name}
                  onChange={handleChange}
                  error={errors.full_name}
                />
                <Input
                  label="E-posta"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <div className="form__row">
                <Select
                  label="Konu"
                  name="subject"
                  required
                  options={CONTACT_SUBJECTS}
                  value={values.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
                {showOrganization && (
                  <Input
                    label="Kurum / şirket"
                    name="organization"
                    autoComplete="organization"
                    value={values.organization}
                    onChange={handleChange}
                    error={errors.organization}
                  />
                )}
              </div>
              <TextArea
                label="Mesajınız"
                name="message"
                required
                rows={6}
                maxLength={3000}
                value={values.message}
                onChange={handleChange}
                error={errors.message}
              />
              <KvkkConsent checked={values.kvkk_consent} onChange={handleChange} error={errors.kvkk_consent} />

              <FormStatus status={form.status} message={form.message} />

              <Button type="submit" size="lg" disabled={form.isSubmitting}>
                {form.isSubmitting ? 'Gönderiliyor…' : 'Mesajı gönder'}
              </Button>
            </form>
          </div>

          <aside className="join-aside">
            <div className="info-card">
              <h2 className="info-card__title">E-posta</h2>
              <p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
            {socials.length > 0 && (
              <div className="info-card">
                <h2 className="info-card__title">Sosyal medya</h2>
                <ul className="social-list">
                  {socials.map((s) => (
                    <li key={s.id}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="info-card">
              <h2 className="info-card__title">Sponsorluk</h2>
              <p className="muted">
                Etkinliklerimize sponsor olmak isteyen kurumlar formda "Sponsorluk" konusunu
                seçebilir. Sponsorluk dosyamızı talep üzerine paylaşıyoruz.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
