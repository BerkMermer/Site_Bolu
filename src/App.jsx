import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Ana sayfa hemen yüklenir; diğer sayfalar ziyaret edildiğinde indirilir
// (ilk açılış daha hızlı → Lighthouse puanı daha yüksek).
const About = lazy(() => import('./pages/About'))
const Team = lazy(() => import('./pages/Team'))
const Events = lazy(() => import('./pages/Events'))
const EventDetail = lazy(() => import('./pages/EventDetail'))
const Join = lazy(() => import('./pages/Join'))
const Contact = lazy(() => import('./pages/Contact'))
const Kvkk = lazy(() => import('./pages/Kvkk'))
const NotFound = lazy(() => import('./pages/NotFound'))

/**
 * Sayfa adresleri. Yeni sayfa eklemek için:
 *   1) src/pages/ altına component'i yazın
 *   2) Buraya bir <Route> ekleyin
 *   3) Menüde görünecekse src/config/site.js → NAV_LINKS'e ekleyin
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="hakkimizda" element={<About />} />
        <Route path="ekip" element={<Team />} />
        <Route path="etkinlikler" element={<Events />} />
        <Route path="etkinlikler/:id" element={<EventDetail />} />
        <Route path="katil" element={<Join />} />
        <Route path="iletisim" element={<Contact />} />
        <Route path="kvkk" element={<Kvkk />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
