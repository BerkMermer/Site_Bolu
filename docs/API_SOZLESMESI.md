# HSD Bolu: API Sözleşmesi (Frontend ↔ Laravel)

Bu belge, React ön yüzünün Laravel API'den beklediği endpoint'leri ve JSON formatını tanımlar.
Ön yüzdeki sahte veriler (`src/services/mockData.js`) bu formatla **birebir** aynıdır;
backend aynı formatta yanıt verdiğinde ön yüzde kod değişikliği gerekmez.

> Alan eklemek/değiştirmek gerekirse önce bu dosyayı güncelleyin ve iki taraf da onaylasın.

## Genel kurallar

| Konu | Kural |
|---|---|
| Temel adres | `VITE_API_URL` (ör. `http://localhost:8000/api`) |
| Format | İstek ve yanıtlar JSON. İstemci `Accept: application/json` gönderir. |
| Alan adları | `snake_case` (Laravel varsayılanı) |
| Tarihler | ISO 8601, saat dilimi ile: `2026-11-12T14:00:00+03:00` |
| Sarmalama | Yanıtlar `{ "data": ... }` içinde olabilir (API Resource) veya düz dönebilir; ön yüz ikisini de kabul eder. |
| Boş alanlar | Değer yoksa `null` (alanı hiç göndermemek yerine). |
| CORS | Laravel `config/cors.php` → `allowed_origins` içine ön yüz adresi (geliştirmede `http://localhost:5173`). Alternatif: Vite proxy (`.env.example`). |

## Hata formatı

| Durum | Ne zaman | Gövde |
|---|---|---|
| `422` | Doğrulama hatası | Laravel varsayılanı: `{ "message": "...", "errors": { "email": ["Geçerli bir e-posta adresi girin."] } }` |
| `404` | Kayıt yok | `{ "message": "..." }` |
| `409` | Etkinlik kaydı kapalı / kontenjan dolu | `{ "message": "Bu etkinliğin kayıtları kapalı." }` |
| `429` | Rate limit | `{ "message": "..." }` |
| `5xx` | Sunucu hatası | Ön yüz genel bir mesaj gösterir. |

`422` yanıtındaki `errors` içindeki **mesajlar Türkçe olmalı**; ön yüz bunları ilgili form alanının altında aynen gösterir.
`409`/`404` için `message` alanı kullanıcıya gösterilir.

---

## GET uçları

### `GET /events`

Sorgu parametreleri (hepsi isteğe bağlı):

| Parametre | Değerler | Açıklama |
|---|---|---|
| `status` | `upcoming` \| `past` | `upcoming`: bitmemiş etkinlikler, **eskiden yeniye**. `past`: bitmiş etkinlikler, **yeniden eskiye**. Yoksa tümü, yeniden eskiye. |
| `type` | `workshop` \| `bootcamp` \| `hackathon` \| `seminer` \| `sosyal` | Türe göre filtre |
| `limit` | sayı | En fazla kaç kayıt |

"Bitmemiş" = `end_date` (yoksa `start_date`) ≥ şimdi.

Yanıt: `Event[]`

### `GET /events/{id}`

Yanıt: `Event`. Bulunamazsa `404`.

### `GET /announcements`

Parametre: `limit` (isteğe bağlı). Sıralama: `published_at` **yeniden eskiye**. Yalnızca yayımlanmış duyurular.

Yanıt: `Announcement[]`

### `GET /team`

Yanıt: `TeamMember[]`. Ön yüz `committee` alanına göre gruplar; sıralama `src/config/site.js` → `COMMITTEES`.

---

## POST uçları

Tümü başarıda **`201`** (veya `200`) ve `{ "message": "Kullanıcıya gösterilecek Türkçe mesaj" }` döner.
Tümünde `kvkk_consent` **`true` olmak zorunda** (`accepted` kuralı).

### `POST /applications`: Üyelik başvurusu

| Alan | Tip | Kural |
|---|---|---|
| `full_name` | string | zorunlu, max 100 |
| `email` | string | zorunlu, email, max 150 |
| `phone` | string \| "" | isteğe bağlı, max 20 |
| `student_number` | string \| "" | isteğe bağlı, max 20 |
| `department` | string | zorunlu, max 100 |
| `grade` | string | zorunlu; `hazirlik`, `1`, `2`, `3`, `4`, `lisansustu`, `mezun` |
| `interest_area` | string \| "" | isteğe bağlı; `yazilim`, `tasarim`, `etkinlik`, `sosyal_medya`, `sponsorluk` |
| `motivation` | string \| "" | isteğe bağlı, max 1000 |
| `kvkk_consent` | boolean | `accepted` |

### `POST /contact`: İletişim / sponsorluk formu

| Alan | Tip | Kural |
|---|---|---|
| `full_name` | string | zorunlu, max 100 |
| `email` | string | zorunlu, email |
| `subject` | string | zorunlu; `genel`, `sponsorluk`, `is_birligi`, `etkinlik` |
| `organization` | string \| "" | isteğe bağlı (sponsorluk / iş birliği konularında gösterilir) |
| `message` | string | zorunlu, min 10, max 3000 |
| `kvkk_consent` | boolean | `accepted` |

### `POST /events/{id}/registrations`: Etkinlik kaydı

| Alan | Tip | Kural |
|---|---|---|
| `full_name` | string | zorunlu, max 100 |
| `email` | string | zorunlu, email; aynı etkinliğe aynı e-posta ile ikinci kayıt → `422` (`errors.email`) |
| `phone` | string \| "" | isteğe bağlı |
| `department` | string \| "" | isteğe bağlı |
| `kvkk_consent` | boolean | `accepted` |

Etkinlik yoksa `404`; `registration_open = false`, etkinlik geçmiş veya kontenjan dolu ise `409`.

> Güvenlik önerisi (backend): POST uçlarına `throttle` middleware (ör. dakikada 5 istek / IP) ekleyin.

---

## Veri tipleri

### `Event`

```json
{
  "id": 1,
  "title": "Flutter ile Mobil Uygulama Geliştirme",
  "type": "workshop",
  "summary": "Kart ve listelerde görünen 1–2 cümlelik özet.",
  "description": "Detay sayfası metni.\n\nBoş satır = yeni paragraf.",
  "start_date": "2026-11-12T14:00:00+03:00",
  "end_date": "2026-11-12T17:00:00+03:00",
  "location": "Mühendislik Fakültesi, Amfi 1",
  "image_url": "https://.../kapak.jpg",
  "capacity": 60,
  "registration_open": true,
  "gallery": ["https://.../1.jpg", "https://.../2.jpg"]
}
```

| Alan | Tip | Not |
|---|---|---|
| `id` | number | |
| `title` | string | |
| `type` | string | `workshop` \| `bootcamp` \| `hackathon` \| `seminer` \| `sosyal` |
| `summary` | string \| null | |
| `description` | string \| null | Düz metin (HTML değil). Paragraflar boş satırla ayrılır. |
| `start_date` | ISO tarih | zorunlu |
| `end_date` | ISO tarih \| null | |
| `location` | string \| null | |
| `image_url` | string \| null | Tam URL. 16:9 önerilir. Yoksa ön yüz renkli bir yer tutucu gösterir. |
| `capacity` | number \| null | |
| `registration_open` | boolean | Admin panelinden açılıp kapatılır |
| `gallery` | string[] | Geçmiş etkinlik fotoğrafları (tam URL). Yoksa `[]`. |

### `Announcement`

```json
{
  "id": 1,
  "title": "Ideathon 2026 kayıtları açıldı",
  "summary": "Kısa açıklama.",
  "published_at": "2026-10-29T10:00:00+03:00",
  "url": null
}
```

`url`: varsa "Devamını oku" bağlantısı gösterilir (dış bağlantı veya ileride blog yazısı).

### `TeamMember`

```json
{
  "id": 1,
  "full_name": "Ad Soyad",
  "role": "Başkan",
  "committee": "Yönetim Kurulu",
  "bio": "Bilgisayar Mühendisliği 4. sınıf.",
  "photo_url": null,
  "linkedin_url": null
}
```

`committee` değerleri: `Yönetim Kurulu`, `Yazılım Komitesi`, `Tasarım Komitesi`, `Etkinlik Komitesi`,
`Sosyal Medya Komitesi`, `Sponsorluk Komitesi` (listede olmayan komite en sona eklenir).
`photo_url` yoksa baş harfler gösterilir. Kare fotoğraf önerilir.

---

## Önerilen veritabanı tabloları (PostgreSQL)

Ön yüzün ihtiyaçlarından türetilmiş öneridir; nihai şema veritabanı sorumlusundadır.

- `events`: yukarıdaki alanlar + `created_at`, `updated_at`; `gallery` için ayrı `event_photos(event_id, url, sort_order)` tablosu
- `event_registrations`: `event_id`, `full_name`, `email`, `phone`, `department`, `kvkk_consent_at`, `created_at`; **unique(event_id, email)**
- `announcements`: `title`, `summary`, `url`, `published_at` (null = taslak)
- `team_members`: yukarıdaki alanlar + `sort_order`, `is_active`
- `applications`: başvuru alanları + `status` (`beklemede` / `onaylandi` / `reddedildi`), `kvkk_consent_at`
- `contact_messages`: iletişim alanları + `is_read`, `kvkk_consent_at`

KVKK: Onay kutusunun değeri yerine **onay zamanı** (`kvkk_consent_at`) saklanması önerilir.
