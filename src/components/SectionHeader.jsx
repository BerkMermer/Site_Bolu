import { Link } from 'react-router-dom'

/** Bölüm başlığı; sağda isteğe bağlı "Tümünü gör" bağlantısı. */
export default function SectionHeader({ title, description, linkTo, linkLabel = 'Tümünü gör', id }) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-header__title" id={id}>
          {title}
        </h2>
        {description && <p className="section-header__description">{description}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="section-header__link">
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  )
}
