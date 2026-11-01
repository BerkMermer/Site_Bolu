/**
 * Gerçek API'yi taklit eden sahte fonksiyonlar.
 * api.js ile aynı imzaya ve aynı dönüş formatına sahiptir: gecikme, 404 ve
 * Laravel tarzı 422 doğrulama hataları dahil. Böylece yükleniyor/hata/başarılı
 * durumları backend olmadan da test edilebilir.
 */
import { ApiError } from './apiError'
import { ANNOUNCEMENTS, EVENTS, TEAM } from './mockData'
import { isUpcoming } from '../utils/format'

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))
const byDate = (key, dir = 1) => (a, b) => dir * (new Date(a[key]) - new Date(b[key]))

export async function getEvents({ status, type, limit } = {}) {
  await delay()
  let list = [...EVENTS]
  if (type) list = list.filter((e) => e.type === type)
  if (status === 'upcoming') list = list.filter((e) => isUpcoming(e)).sort(byDate('start_date'))
  else if (status === 'past') list = list.filter((e) => !isUpcoming(e)).sort(byDate('start_date', -1))
  else list.sort(byDate('start_date', -1))
  return limit ? list.slice(0, Number(limit)) : list
}

export async function getEvent(id) {
  await delay()
  const event = EVENTS.find((e) => String(e.id) === String(id))
  if (!event) throw new ApiError('Aradığınız etkinlik bulunamadı.', { status: 404 })
  return event
}

export async function getAnnouncements({ limit } = {}) {
  await delay()
  const list = [...ANNOUNCEMENTS].sort(byDate('published_at', -1))
  return limit ? list.slice(0, Number(limit)) : list
}

export async function getTeam() {
  await delay()
  return TEAM
}

/* ------------------------- Laravel benzeri doğrulama ------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const rules = {
  required: (label) => (v) => (v === undefined || v === null || String(v).trim() === '' ? `${label} alanı zorunludur.` : null),
  email: () => (v) => (v && !EMAIL_RE.test(v) ? 'Geçerli bir e-posta adresi girin.' : null),
  accepted: () => (v) => (v === true ? null : 'Devam etmek için KVKK aydınlatma metnini onaylamalısınız.'),
  min: (label, n) => (v) => (v && String(v).trim().length < n ? `${label} en az ${n} karakter olmalıdır.` : null),
}

/** { alan: [kural, ...] } → Laravel formatında { alan: ['mesaj'] } */
function validate(values, schema) {
  const errors = {}
  for (const [field, checks] of Object.entries(schema)) {
    for (const check of checks) {
      const message = check(values[field])
      if (message) {
        errors[field] = [message]
        break
      }
    }
  }
  if (Object.keys(errors).length) {
    throw new ApiError('Lütfen işaretli alanları kontrol edin.', { status: 422, fieldErrors: errors })
  }
}

export async function sendApplication(values) {
  await delay(700)
  validate(values, {
    full_name: [rules.required('Ad soyad')],
    email: [rules.required('E-posta'), rules.email()],
    department: [rules.required('Bölüm')],
    grade: [rules.required('Sınıf')],
    kvkk_consent: [rules.accepted()],
  })
  return { message: 'Başvurun alındı! En kısa sürede seninle iletişime geçeceğiz.' }
}

export async function sendContactMessage(values) {
  await delay(700)
  validate(values, {
    full_name: [rules.required('Ad soyad')],
    email: [rules.required('E-posta'), rules.email()],
    subject: [rules.required('Konu')],
    message: [rules.required('Mesaj'), rules.min('Mesaj', 10)],
    kvkk_consent: [rules.accepted()],
  })
  return { message: 'Mesajın bize ulaştı. Teşekkürler!' }
}

export async function registerForEvent(eventId, values) {
  await delay(700)
  const event = EVENTS.find((e) => String(e.id) === String(eventId))
  if (!event) throw new ApiError('Aradığınız etkinlik bulunamadı.', { status: 404 })
  if (!event.registration_open || !isUpcoming(event)) {
    throw new ApiError('Bu etkinliğin kayıtları kapalı.', { status: 409 })
  }
  validate(values, {
    full_name: [rules.required('Ad soyad')],
    email: [rules.required('E-posta'), rules.email()],
    kvkk_consent: [rules.accepted()],
  })
  return { message: `"${event.title}" etkinliğine kaydın alındı. Görüşmek üzere!` }
}
