/**
 * Tüm backend istekleri bu dosyadan geçer.
 *
 * - Component ve hook'lar sadece buradaki fonksiyonları çağırır, axios'u doğrudan kullanmaz.
 * - VITE_API_URL tanımlı değilse veya VITE_USE_MOCK=true ise sahte veriler (mockApi.js)
 *   kullanılır. Backend hazır olduğunda yalnızca .env değişir, kod değişmez.
 * - Endpoint'lerin JSON formatı: docs/API_SOZLESMESI.md
 */
import axios from 'axios'
import { toApiError } from './apiError'
import * as mockApi from './mockApi'

const API_URL = import.meta.env.VITE_API_URL

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !API_URL

if (USE_MOCK && import.meta.env.DEV) {
  console.info('[api] Sahte veri (mock) modu açık. Gerçek API için .env dosyasını düzenleyin.')
}

const http = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/** Laravel API Resource yanıtları { data: ... } içinde gelir; ikisini de destekle. */
function unwrap(response) {
  const body = response.data
  return body && typeof body === 'object' && !Array.isArray(body) && 'data' in body
    ? body.data
    : body
}

/** Boş/undefined parametreleri URL'e eklememek için. */
function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ''),
  )
}

async function get(url, { params, signal } = {}) {
  try {
    return unwrap(await http.get(url, { params: cleanParams(params), signal }))
  } catch (error) {
    throw toApiError(error)
  }
}

async function post(url, body) {
  try {
    const response = await http.post(url, body)
    return response.data ?? {}
  } catch (error) {
    throw toApiError(error)
  }
}

/* ---------------------------------- GET ---------------------------------- */

/**
 * Etkinlik listesi.
 * @param {{ status?: 'upcoming'|'past', type?: string, limit?: number }} params
 */
export function getEvents(params = {}, { signal } = {}) {
  return USE_MOCK ? mockApi.getEvents(params) : get('/events', { params, signal })
}

/** Tek etkinlik (detay sayfası). Bulunamazsa ApiError(status 404). */
export function getEvent(id, { signal } = {}) {
  return USE_MOCK ? mockApi.getEvent(id) : get(`/events/${encodeURIComponent(id)}`, { signal })
}

/** Duyurular (en yeni önce). */
export function getAnnouncements(params = {}, { signal } = {}) {
  return USE_MOCK ? mockApi.getAnnouncements(params) : get('/announcements', { params, signal })
}

/** Ekip üyeleri. */
export function getTeam({ signal } = {}) {
  return USE_MOCK ? mockApi.getTeam() : get('/team', { signal })
}

/* ---------------------------------- POST --------------------------------- */
// Hepsi başarıda { message } döner; doğrulama hatasında ApiError(status 422, fieldErrors).

/** Üyelik başvurusu (Katıl sayfası). */
export function sendApplication(values) {
  return USE_MOCK ? mockApi.sendApplication(values) : post('/applications', values)
}

/** İletişim / sponsorluk formu. */
export function sendContactMessage(values) {
  return USE_MOCK ? mockApi.sendContactMessage(values) : post('/contact', values)
}

/** Etkinlik kaydı. */
export function registerForEvent(eventId, values) {
  return USE_MOCK
    ? mockApi.registerForEvent(eventId, values)
    : post(`/events/${encodeURIComponent(eventId)}/registrations`, values)
}
