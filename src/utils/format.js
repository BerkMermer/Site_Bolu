// Tarih ve metin biçimlendirme yardımcıları.
// Tüm tarihler Türkiye saatine göre gösterilir (ziyaretçinin saat diliminden bağımsız).

const TZ = 'Europe/Istanbul'

const dateFmt = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: TZ,
})
const timeFmt = new Intl.DateTimeFormat('tr-TR', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: TZ,
})
const weekdayFmt = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', timeZone: TZ })
const dayFmt = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', timeZone: TZ })
const monthShortFmt = new Intl.DateTimeFormat('tr-TR', { month: 'short', timeZone: TZ })
const dayKeyFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ }) // YYYY-MM-DD

function toDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

/** "12 Kasım 2026" */
export function formatDate(value) {
  const date = toDate(value)
  return date ? dateFmt.format(date) : ''
}

/** "14:00" */
export function formatTime(value) {
  const date = toDate(value)
  return date ? timeFmt.format(date) : ''
}

/** "Perşembe" */
export function formatWeekday(value) {
  const date = toDate(value)
  return date ? weekdayFmt.format(date) : ''
}

/** Takvim rozeti için { day: "12", month: "Kas" } */
export function dateBadge(value) {
  const date = toDate(value)
  if (!date) return null
  return { day: dayFmt.format(date), month: monthShortFmt.format(date).replace('.', '') }
}

/**
 * Aynı gün:  "12 Kasım 2026 · 14:00 – 17:00"
 * Farklı gün: "12 Kasım 2026 – 13 Kasım 2026"
 */
export function formatDateRange(start, end) {
  const s = toDate(start)
  const e = toDate(end)
  if (!s) return ''
  if (!e) return `${dateFmt.format(s)} · ${timeFmt.format(s)}`
  if (dayKeyFmt.format(s) === dayKeyFmt.format(e)) {
    return `${dateFmt.format(s)} · ${timeFmt.format(s)} – ${timeFmt.format(e)}`
  }
  return `${dateFmt.format(s)} – ${dateFmt.format(e)}`
}

/** Etkinlik bitmediyse yaklaşan sayılır. */
export function isUpcoming(event, now = new Date()) {
  const end = toDate(event?.end_date) ?? toDate(event?.start_date)
  return end ? end >= now : false
}

/** "Ayşe Yılmaz" → "AY" */
export function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toLocaleUpperCase('tr-TR'))
    .join('')
}

/** Paragraflara bölünmüş metin (boş satırlar paragraf ayırır). */
export function toParagraphs(text = '') {
  return String(text)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}
