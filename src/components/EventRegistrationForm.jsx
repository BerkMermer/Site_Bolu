import { useForm } from '../hooks/useForm'
import { registerForEvent } from '../services/api'
import Button from './Button'
import { Input } from './FormFields'
import FormStatus from './FormStatus'
import KvkkConsent from './KvkkConsent'

const INITIAL = {
  full_name: '',
  email: '',
  phone: '',
  department: '',
  kvkk_consent: false,
}

/** Etkinlik detay sayfasındaki kayıt formu. */
export default function EventRegistrationForm({ eventId }) {
  const form = useForm(INITIAL, (values) => registerForEvent(eventId, values))
  const { values, errors, handleChange } = form

  return (
    <form className="form" onSubmit={form.handleSubmit} noValidate>
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
      <Input
        label="Telefon"
        name="phone"
        type="tel"
        autoComplete="tel"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <Input
        label="Bölüm"
        name="department"
        value={values.department}
        onChange={handleChange}
        error={errors.department}
      />
      <KvkkConsent checked={values.kvkk_consent} onChange={handleChange} error={errors.kvkk_consent} />

      <FormStatus status={form.status} message={form.message} />

      <Button type="submit" block disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Gönderiliyor…' : 'Kaydımı oluştur'}
      </Button>
    </form>
  )
}
