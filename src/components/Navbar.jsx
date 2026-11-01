import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../config/site'
import Button from './Button'

/** Üst menü. Mobilde hamburger menüye dönüşür; Esc tuşu menüyü kapatır. */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" onClick={close} aria-label={`${SITE.name} ana sayfa`}>
          <span className="navbar__logo" aria-hidden="true">
            HSD
          </span>
          <span className="navbar__name">Bolu</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={open}
          aria-controls="main-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? 'Menüyü kapat' : 'Menüyü aç'}</span>
          <span className="navbar__toggle-icon" aria-hidden="true" />
        </button>

        <nav id="main-menu" className={`navbar__menu${open ? ' is-open' : ''}`} aria-label="Ana menü">
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `navbar__link${isActive ? ' is-active' : ''}`}
                  onClick={close}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/katil" size="sm" className="navbar__cta" onClick={close}>
            Bize Katıl
          </Button>
        </nav>
      </div>
    </header>
  )
}
