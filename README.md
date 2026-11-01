# HSD Bolu Web Sitesi

Bolu Abant İzzet Baysal Üniversitesi **Huawei Student Developers** topluluğunun web sitesi (ön yüz).

React 19 + Vite + React Router + Axios. Backend: Laravel REST API (ayrı repo).

## Hızlı başlangıç

```bash
npm install
cp .env.example .env     # isteğe bağlı; .env yoksa site sahte verilerle çalışır
npm run dev              # http://localhost:5173
```

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu |
| `npm run build` | Yayın için `dist/` klasörünü üretir |
| `npm run preview` | `dist/` çıktısını yerelde açar |
| `npm run lint` | Kod kontrolü (oxlint) |

## Backend olmadan çalışmak (mock modu)

`VITE_API_URL` boşsa veya `VITE_USE_MOCK=true` ise tüm istekler `src/services/mockApi.js`'e gider:
gecikme, 404 ve Laravel tarzı 422 doğrulama hataları dahil. Laravel API hazır olunca yalnızca `.env` değişir:

```env
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK=false
```

Endpoint'ler ve JSON formatı: **[docs/API_SOZLESMESI.md](docs/API_SOZLESMESI.md)**.

## Klasör yapısı

```
src/
  main.jsx            Uygulama girişi (BrowserRouter)
  App.jsx             Sayfa adresleri (route'lar)
  index.css           Tüm stiller: renkler/yazı tipleri en üstte (:root)
  config/site.js      Sabit içerik: menü, sosyal medya, sayılar, form seçenekleri
  components/         Tekrar kullanılan parçalar (Navbar, Footer, EventCard, Button, form alanları...)
  pages/              Sayfalar (Home, About, Team, Events, EventDetail, Join, Contact, Kvkk, NotFound)
  hooks/              Veri çeken hook'lar (useEvents, useTeam...) + useForm
  services/api.js     TÜM backend istekleri burada
  services/mock*.js   Sahte veri ve sahte API
  utils/format.js     Tarih biçimlendirme (Türkiye saati)
docs/                 API sözleşmesi
public/               Doğrudan sunulan dosyalar (favicon, _redirects)
```

## Sayfalar

| Adres | Sayfa |
|---|---|
| `/` | Ana sayfa: tanıtım, sıradaki etkinlik, sayılar, duyurular |
| `/hakkimizda` | HSD nedir, misyon, vizyon |
| `/ekip` | Yönetim kurulu ve komiteler |
| `/etkinlikler` | Yaklaşan / geçmiş etkinlikler, türe göre filtre (`?durum=gecmis&tur=hackathon`) |
| `/etkinlikler/:id` | Etkinlik detayı, kayıt formu, galeri |
| `/katil` | Üyelik başvuru formu, WhatsApp/Discord |
| `/iletisim` | İletişim / sponsorluk formu (`?konu=sponsorluk`) |
| `/kvkk` | KVKK aydınlatma metni (**taslak**) |

## Nasıl yapılır?

- **Yeni sayfa:** `src/pages/` altına component → `src/App.jsx`'e `<Route>` → menüde görünecekse `src/config/site.js` → `NAV_LINKS`.
- **Yeni API çağrısı:** `src/services/api.js`'e fonksiyon + aynı imzayla `mockApi.js`'e sahte karşılığı → gerekirse `src/hooks/` altına `useFetch` kullanan bir hook.
- **Form:** `useForm(başlangıçDeğerleri, apiFonksiyonu)` + `FormFields` component'leri + `KvkkConsent` + `FormStatus`. 422 hataları alanların altında otomatik görünür.
- **Veri gösterimi:** `<DataState loading error onRetry isEmpty empty>`: yükleniyor / hata / boş durumlarını tek yerden yönetir.
- **Tasarım değişikliği:** önce `src/index.css` içindeki `:root` değişkenleri; sınıf adları BEM düzeninde (`event-card__title`).

## Yayın (deploy)

SPA olduğu için tüm adresler `index.html`'e yönlendirilmeli; ayarlar hazır:
`vercel.json` (Vercel) ve `public/_redirects` (Netlify). Yayın ortamında `VITE_API_URL` ve `VITE_USE_MOCK=false`
ortam değişkenlerini hosting panelinden girin.

## Yayından önce yapılacaklar

`TODO` aramasıyla bulunabilir:

- [ ] `src/config/site.js`: topluluk e-postası, sosyal medya, WhatsApp/Discord davet bağlantıları, gerçek sayılar
- [ ] `src/pages/About.jsx`: Hakkımızda metinleri (yönetim onayı)
- [ ] `src/pages/Kvkk.jsx`: KVKK metni (hukuki kontrol)
- [ ] Logo ve renkler (HSD kurumsal kimlik onayı) → `public/favicon.svg`, `src/index.css`
- [ ] Laravel API bağlantısı ve CORS
