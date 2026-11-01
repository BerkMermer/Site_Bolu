import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Sayfa değişince en üste kaydırır (SPA'larda tarayıcı bunu kendisi yapmaz). */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
