import { useState } from 'react'

/**
 * Form state'i ve gönderim durumları.
 *
 *   const form = useForm({ full_name: '', email: '' }, sendApplication)
 *   <form onSubmit={form.handleSubmit} noValidate>
 *     <Input name="full_name" value={form.values.full_name} onChange={form.handleChange}
 *            error={form.errors.full_name} />
 *
 * status: 'idle' | 'submitting' | 'success' | 'error'
 * errors: { alan: 'ilk hata mesajı' }  (Laravel 422 yanıtından)
 */
export function useForm(initialValues, submitFn, { resetOnSuccess = true } = {}) {
  const [values, setValues] = useState(initialValues)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function handleChange(event) {
    const { name, type, value, checked } = event.target
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    // Kullanıcı alanı düzeltmeye başlayınca o alanın hatasını kaldır.
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'submitting') return
    const form = event.currentTarget

    setStatus('submitting')
    setErrors({})
    setMessage('')

    try {
      const result = await submitFn(values)
      setStatus('success')
      setMessage(result?.message || 'Gönderildi. Teşekkürler!')
      if (resetOnSuccess) setValues(initialValues)
    } catch (error) {
      setStatus('error')
      setErrors(firstMessages(error?.fieldErrors))
      setMessage(error?.message || 'Beklenmeyen bir hata oluştu.')
      // Erişilebilirlik: hatalı ilk alana odaklan.
      requestAnimationFrame(() => {
        form?.querySelector('[aria-invalid="true"]')?.focus()
      })
    }
  }

  function reset() {
    setValues(initialValues)
    setErrors({})
    setMessage('')
    setStatus('idle')
  }

  return {
    values,
    setValues,
    errors,
    status,
    message,
    isSubmitting: status === 'submitting',
    handleChange,
    handleSubmit,
    reset,
  }
}

/** { email: ['a', 'b'] } → { email: 'a' } */
function firstMessages(fieldErrors = {}) {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, msgs]) => [field, Array.isArray(msgs) ? msgs[0] : String(msgs)]),
  )
}
