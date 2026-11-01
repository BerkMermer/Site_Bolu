/**
 * Sitenin sabit içerikleri ve ayarları.
 *
 * İçerik sorumlusu metinleri, sayıları ve bağlantıları buradan güncelleyebilir;
 * component kodlarına dokunmak gerekmez.
 *
 * "TODO" ile işaretli değerler yer tutucudur, yayından önce gerçek değerlerle
 * değiştirilmelidir.
 */

export const SITE = {
  name: 'HSD Bolu',
  fullName: 'Huawei Student Developers Bolu',
  university: 'Bolu Abant İzzet Baysal Üniversitesi',
  universityShort: 'BAİBÜ',
  tagline: 'Teknolojiyi birlikte öğren, üret ve paylaş.',
  description:
    "HSD Bolu, Bolu Abant İzzet Baysal Üniversitesi'nde yazılım ve teknolojiye ilgi duyan öğrencileri workshop, bootcamp ve hackathonlarla bir araya getiren Huawei Student Developers topluluğudur.",
  email: 'iletisim@example.com', // TODO: topluluk e-posta adresi
}

/** Üst menü bağlantıları. "Bize Katıl" ayrıca buton olarak gösterilir. */
export const NAV_LINKS = [
  { to: '/', label: 'Ana Sayfa', end: true },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/ekip', label: 'Ekip' },
  { to: '/etkinlikler', label: 'Etkinlikler' },
  { to: '/iletisim', label: 'İletişim' },
]

/** Sosyal medya hesapları. url boş bırakılan hesap sitede gösterilmez. */
export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' }, // TODO
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' }, // TODO
  { id: 'github', label: 'GitHub', url: 'https://github.com/' }, // TODO
  { id: 'youtube', label: 'YouTube', url: '' }, // TODO: varsa ekleyin
]

/** Katıl sayfasındaki topluluk grupları. */
export const COMMUNITY_LINKS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp Duyuru Grubu',
    description: 'Etkinlik duyurularını ilk sen öğren.',
    url: 'https://chat.whatsapp.com/', // TODO: davet bağlantısı
  },
  {
    id: 'discord',
    label: 'Discord Sunucusu',
    description: 'Soru sor, proje arkadaşı bul, sohbete katıl.',
    url: 'https://discord.gg/', // TODO: davet bağlantısı
  },
]

/** Ana sayfadaki "Sayılarla HSD Bolu" bölümü. TODO: gerçek sayılarla güncelleyin. */
export const STATS = [
  { value: '250+', label: 'Üye' },
  { value: '20+', label: 'Etkinlik' },
  { value: '3', label: 'Hackathon' },
  { value: '15+', label: 'Konuşmacı' },
]

/** Etkinlik türleri: API'deki "type" alanı → ekranda görünen ad. */
export const EVENT_TYPES = {
  workshop: 'Workshop',
  bootcamp: 'Bootcamp',
  hackathon: 'Hackathon',
  seminer: 'Seminer',
  sosyal: 'Sosyal',
}

/** Ekip sayfasındaki grupların sırası. Burada olmayan komiteler en sona eklenir. */
export const COMMITTEES = [
  'Yönetim Kurulu',
  'Yazılım Komitesi',
  'Tasarım Komitesi',
  'Etkinlik Komitesi',
  'Sosyal Medya Komitesi',
  'Sponsorluk Komitesi',
]

/** Form seçenekleri: value API'ye gönderilir, label ekranda görünür. */
export const INTEREST_AREAS = [
  { value: 'yazilim', label: 'Yazılım geliştirme' },
  { value: 'tasarim', label: 'UI/UX ve grafik tasarım' },
  { value: 'etkinlik', label: 'Etkinlik ve organizasyon' },
  { value: 'sosyal_medya', label: 'Sosyal medya ve içerik' },
  { value: 'sponsorluk', label: 'Sponsorluk ve dış ilişkiler' },
]

export const GRADES = [
  { value: 'hazirlik', label: 'Hazırlık' },
  { value: '1', label: '1. sınıf' },
  { value: '2', label: '2. sınıf' },
  { value: '3', label: '3. sınıf' },
  { value: '4', label: '4. sınıf' },
  { value: 'lisansustu', label: 'Yüksek lisans / Doktora' },
  { value: 'mezun', label: 'Mezun' },
]

export const CONTACT_SUBJECTS = [
  { value: 'genel', label: 'Genel soru' },
  { value: 'sponsorluk', label: 'Sponsorluk' },
  { value: 'is_birligi', label: 'İş birliği / ortak etkinlik' },
  { value: 'etkinlik', label: 'Etkinliklerle ilgili' },
]

/** Bu konularda "Kurum / şirket" alanı da gösterilir. */
export const ORGANIZATION_SUBJECTS = ['sponsorluk', 'is_birligi']

/** Tarayıcı sekmesindeki başlık. */
export function pageTitle(title) {
  return title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.fullName}`
}
