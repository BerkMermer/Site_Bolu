import { pageTitle } from '../config/site'

/**
 * İç sayfaların üst başlık alanı. Tarayıcı sekme başlığını da ayarlar
 * (React 19, <title> etiketini otomatik olarak <head> içine taşır).
 */
export default function PageHeader({ title, description, eyebrow, children }) {
  return (
    <header className="page-header">
      <title>{pageTitle(title)}</title>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-header__title">{title}</h1>
        {description && <p className="page-header__description">{description}</p>}
        {children}
      </div>
    </header>
  )
}
