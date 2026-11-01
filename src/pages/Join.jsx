import Button from '../components/Button'
import { Input, Select, TextArea } from '../components/FormFields'
import FormStatus from '../components/FormStatus'
import KvkkConsent from '../components/KvkkConsent'
import PageHeader from '../components/PageHeader'
import { COMMUNITY_LINKS, GRADES, INTEREST_AREAS } from '../config/site'
import { useForm } from '../hooks/useForm'
import { sendApplication } from '../services/api'

const INITIAL = {
  full_name: '',
  email: '',
  phone: '',
  student_number: '',
  department: '',
  grade: '',
  interest_area: '',
  motivation: '',
  kvkk_consent: false,
}

export default function Join() {
  const form = useForm(INITIAL, sendApplication)
  const { values, errors, handleChange } = form

  return (
    <>
      <PageHeader
        eyebrow="Katıl"
        title="HSD Bolu'ya katıl"
        description="Formu doldur, ekibimiz seninle iletişime geçsin. Üyelik ücretsizdir ve her bölümden öğrenciye açıktır."
      />

      <section className="section">
        <div className="container join-layout">
          <div className="form-card">
            <h2 className="form-card__title">Üyelik başvuru formu</h2>
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
                <Input
                  label="Telefon"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  hint="Duyuru grubuna eklenmek istersen."
                />
                <Input
                  label="Öğrenci numarası"
                  name="student_number"
                  inputMode="numeric"
                  value={values.student_number}
                  onChange={handleChange}
                  error={errors.student_number}
                />
              </div>
              <div className="form__row">
                <Input
                  label="Bölüm"
                  name="department"
                  required
                  value={values.department}
                  onChange={handleChange}
                  error={errors.department}
                />
                <Select
                  label="Sınıf"
                  name="grade"
                  required
                  options={GRADES}
                  value={values.grade}
                  onChange={handleChange}
                  error={errors.grade}
                />
              </div>
              <Select
                label="En çok ilgini çeken alan"
                name="interest_area"
                options={INTEREST_AREAS}
                value={values.interest_area}
                onChange={handleChange}
                error={errors.interest_area}
              />
              <TextArea
                label="Neden katılmak istiyorsun?"
                name="motivation"
                rows={4}
                maxLength={1000}
                value={values.motivation}
                onChange={handleChange}
                error={errors.motivation}
              />
              <KvkkConsent checked={values.kvkk_consent} onChange={handleChange} error={errors.kvkk_consent} />

              <FormStatus status={form.status} message={form.message} />

              <Button type="submit" size="lg" disabled={form.isSubmitting}>
                {form.isSubmitting ? 'Gönderiliyor…' : 'Başvurumu gönder'}
              </Button>
            </form>
          </div>

          <aside className="join-aside">
            <h2 className="join-aside__title">Topluluk kanallarımız</h2>
            <p className="muted">Başvurunu beklemeden gruplarımıza katılabilirsin.</p>
            <ul className="community-list">
              {COMMUNITY_LINKS.filter((c) => c.url).map((c) => (
                <li key={c.id} className={`community-card community-card--${c.id}`}>
                  <h3 className="community-card__title">{c.label}</h3>
                  <p>{c.description}</p>
                  <Button href={c.url} variant="outline" size="sm">
                    Katıl<span className="visually-hidden">: {c.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
