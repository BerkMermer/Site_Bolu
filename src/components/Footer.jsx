import { Link } from 'react-router-dom'
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '../config/site'

// Sayfa yüklendiğinde bir kez hesaplanır (render sırasında Date çağırmamak için).
const YEAR = new Date().getFullYear()

export default function Footer() {
  const socials = SOCIAL_LINKS.filter((s) => s.url)

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <Link to="/" className="footer__brand">
            <img src="/logo.png" alt="" className="navbar__logo-img" width="854" height="257" />
            <span className="navbar__name">Bolu</span>
          </Link>
          <p>{SITE.description}</p>
        </div>

        <nav aria-label="Alt menü">
          <h2 className="footer__heading">Sayfalar</h2>
          <ul className="footer__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/katil">Bize Katıl</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="footer__heading">Bizi takip et</h2>
          <ul className="footer__list">
            {socials.map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">İletişim</h2>
          <ul className="footer__list">
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <Link to="/iletisim?konu=sponsorluk">Sponsorluk</Link>
            </li>
            <li>
              <Link to="/kvkk">KVKK Aydınlatma Metni</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {YEAR} {SITE.fullName} · {SITE.university}
        </p>
      </div>
    </footer>
  )
}
