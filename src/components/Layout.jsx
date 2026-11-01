import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Loading from './Loading'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

/** Tüm sayfaların ortak iskeleti: menü + içerik + alt bilgi. */
export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        İçeriğe geç
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        {/* Sayfalar ihtiyaç anında yüklenir (lazy); bu sırada Loading görünür. */}
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
