/**
 * Form gönderim sonucunu gösterir (başarılı / hata).
 * aria-live sayesinde ekran okuyucular mesajı otomatik okur.
 */
export default function FormStatus({ status, message }) {
  const visible = (status === 'success' || status === 'error') && message
  return (
    <div aria-live="polite" aria-atomic="true">
      {visible && (
        <div className={`alert alert--${status === 'success' ? 'success' : 'error'}`}>{message}</div>
      )}
    </div>
  )
}
