import { useId } from 'react'

/**
 * Form alanları: Input, TextArea, Select, Checkbox.
 * Hepsi etiket, zorunlu işareti, ipucu metni ve hata mesajını aynı şekilde gösterir.
 * error prop'u genelde useForm'un errors[alanAdı] değeridir (Laravel 422).
 */

function describedBy(id, error, hint) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? (
          <span className="field__required" aria-hidden="true">
            {' '}*
          </span>
        ) : (
          <span className="field__optional"> (isteğe bağlı)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field__error">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="field__hint">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

function controlProps(id, { error, hint, required }) {
  return {
    id,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy(id, error, hint),
    className: 'field__control',
  }
}

export function Input({ label, error, hint, required, type = 'text', ...props }) {
  const id = useId()
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <input type={type} {...controlProps(id, { error, hint, required })} {...props} />
    </Field>
  )
}

export function TextArea({ label, error, hint, required, rows = 5, ...props }) {
  const id = useId()
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <textarea rows={rows} {...controlProps(id, { error, hint, required })} {...props} />
    </Field>
  )
}

export function Select({ label, error, hint, required, options = [], placeholder = 'Seçin', ...props }) {
  const id = useId()
  return (
    <Field id={id} label={label} required={required} error={error} hint={hint}>
      <select {...controlProps(id, { error, hint, required })} {...props}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function Checkbox({ error, required, children, ...props }) {
  const id = useId()
  return (
    <div className={`field field--checkbox${error ? ' field--error' : ''}`}>
      <div className="checkbox">
        <input
          type="checkbox"
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <label htmlFor={id}>{children}</label>
      </div>
      {error && (
        <p id={`${id}-error`} className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}
