import axios from 'axios'

/**
 * Uygulama genelinde kullanılan tek hata tipi.
 * Component'ler axios'u bilmez; sadece message, status ve fieldErrors'a bakar.
 *
 * fieldErrors Laravel'in 422 formatındadır:  { email: ['E-posta zorunludur.'] }
 */
export class ApiError extends Error {
  constructor(message, { status = 0, fieldErrors = {} } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }

  get isValidation() {
    return this.status === 422
  }

  get isNotFound() {
    return this.status === 404
  }
}

const STATUS_MESSAGES = {
  401: 'Bu işlem için oturum açmanız gerekiyor.',
  403: 'Bu işlem için yetkiniz yok.',
  404: 'Aradığınız içerik bulunamadı.',
  419: 'Oturum süreniz doldu. Sayfayı yenileyip tekrar deneyin.',
  422: 'Lütfen işaretli alanları kontrol edin.',
  429: 'Çok fazla istek gönderildi. Lütfen biraz bekleyip tekrar deneyin.',
}

/** axios hatasını ApiError'a çevirir. İptal edilen istekler olduğu gibi döner. */
export function toApiError(error) {
  if (error instanceof ApiError || axios.isCancel(error)) return error

  const response = error?.response
  if (!response) {
    const message =
      error?.code === 'ECONNABORTED'
        ? 'Sunucu zamanında yanıt vermedi. Lütfen tekrar deneyin.'
        : 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.'
    return new ApiError(message)
  }

  const { status, data } = response

  if (status === 422) {
    // Laravel'in genel mesajı ("The given data was invalid." vb.) yerine kendi
    // Türkçe mesajımızı gösteriyoruz; alan bazlı mesajlar backend'den gelir.
    return new ApiError(STATUS_MESSAGES[422], { status, fieldErrors: data?.errors ?? {} })
  }

  const message =
    STATUS_MESSAGES[status] ??
    (status >= 500
      ? 'Sunucuda bir sorun oluştu. Lütfen daha sonra tekrar deneyin.'
      : data?.message || 'Beklenmeyen bir hata oluştu.')

  return new ApiError(message, { status })
}
