import PageHeader from '../components/PageHeader'
import { SITE } from '../config/site'

/*
 * ÖNEMLİ: Bu metin bir TASLAKTIR. Yayından önce yönetim kurulu ve mümkünse
 * üniversitenin hukuk birimi tarafından gözden geçirilmelidir. Veri sorumlusu,
 * saklama süreleri ve aktarım bilgileri gerçek duruma göre güncellenmelidir.
 */
export default function Kvkk() {
  return (
    <>
      <PageHeader title="KVKK Aydınlatma Metni" eyebrow="Kişisel verilerin korunması" />

      <section className="section">
        <div className="container prose">
          <p className="alert alert--warning">
            Taslak metin. Yayından önce gözden geçirilecektir.
          </p>

          <p>
            {SITE.fullName} ("{SITE.name}") olarak, 6698 sayılı Kişisel Verilerin Korunması
            Kanunu ("KVKK") kapsamında, web sitemizdeki formlar aracılığıyla paylaştığınız
            kişisel verilerinizi aşağıda açıklanan çerçevede işlemekteyiz.
          </p>

          <h2>İşlenen kişisel veriler</h2>
          <ul>
            <li>Kimlik bilgileri: ad, soyad</li>
            <li>İletişim bilgileri: e-posta adresi, telefon numarası</li>
            <li>Eğitim bilgileri: bölüm, sınıf, öğrenci numarası</li>
            <li>Formlara yazdığınız diğer bilgiler (ilgi alanı, mesaj içeriği vb.)</li>
          </ul>

          <h2>İşleme amaçları</h2>
          <ul>
            <li>Üyelik başvurularının değerlendirilmesi ve üyelerle iletişim kurulması</li>
            <li>Etkinlik kayıtlarının alınması, katılımın planlanması ve bilgilendirme yapılması</li>
            <li>İletişim, sponsorluk ve iş birliği taleplerinin yanıtlanması</li>
          </ul>

          <h2>Hukuki sebep ve toplama yöntemi</h2>
          <p>
            Kişisel verileriniz, web sitemizdeki formlar aracılığıyla elektronik ortamda ve
            açık rızanıza dayanılarak toplanmaktadır.
          </p>

          <h2>Aktarım</h2>
          <p>
            Kişisel verileriniz üçüncü kişilerle paylaşılmaz; yalnızca yasal yükümlülükler
            kapsamında yetkili kurumlarla paylaşılabilir.
          </p>

          <h2>Saklama süresi</h2>
          <p>
            Verileriniz, işleme amacının gerektirdiği süre boyunca saklanır ve bu sürenin
            sonunda silinir veya anonim hale getirilir.
          </p>

          <h2>Haklarınız</h2>
          <p>
            KVKK'nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme,
            düzeltilmesini veya silinmesini isteme ve işlemeye itiraz etme haklarına
            sahipsiniz. Talepleriniz için <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{' '}
            adresine yazabilirsiniz.
          </p>
        </div>
      </section>
    </>
  )
}
