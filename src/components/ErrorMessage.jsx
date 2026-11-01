import Button from './Button'

/** Veri yüklenemediğinde gösterilen hata kutusu; isteğe bağlı "Tekrar dene" butonu. */
export default function ErrorMessage({ error, onRetry, title = 'Bir sorun oluştu' }) {
  const message =
    typeof error === 'string' ? error : error?.message || 'Beklenmeyen bir hata oluştu.'

  return (
    <div className="error-box" role="alert">
      <p className="error-box__title">{title}</p>
      <p className="error-box__message">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Tekrar dene
        </Button>
      )}
    </div>
  )
}
