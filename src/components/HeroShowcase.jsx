import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BrainCircuit, CalendarDays, MapPin, ShieldCheck, Smartphone } from 'lucide-react'
import { EVENT_TYPES, FEATURED_ARTICLE, SITE, STATS } from '../config/site'
import { useEvents } from '../hooks/useEvents'
import { formatDateRange } from '../utils/format'
import Loading from './Loading'

const HEADLINE = ['Kodun Doğasında', 'İnovasyon']

const FOCUS_AREAS = [
  { icon: BrainCircuit, label: 'Yapay Zeka' },
  { icon: ShieldCheck, label: 'Bulut & Siber Güvenlik' },
  { icon: Smartphone, label: 'Mobil Geliştirme' },
]

const DISPLAY = { fontFamily: "'Fraunces', 'Iowan Old Style', Georgia, serif" }
const BODY = { fontFamily: "'Figtree', system-ui, -apple-system, 'Segoe UI', sans-serif" }
const EASE = [0.22, 1, 0.36, 1]

const stagger = (delayChildren = 0.05, staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})
const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

const GLASS =
  'rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-colors duration-300 hover:border-white/20'

function AmbientGlow() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 900], [0, 180])
  const scale = useTransform(scrollY, [0, 900], [1, 1.3])
  const opacity = useTransform(scrollY, [0, 700], [1, 0.3])

  return (
    <motion.div
      aria-hidden="true"
      style={reduce ? undefined : { y, scale, opacity, willChange: 'transform, opacity' }}
      className="pointer-events-none absolute -right-24 -top-24 -z-10 h-[34rem] w-[34rem] transform-gpu rounded-full bg-[radial-gradient(closest-side,rgba(221,161,94,0.22),rgba(82,183,136,0.12)_55%,transparent)]"
    />
  )
}

export default function HeroShowcase() {
  const events = useEvents({ status: 'upcoming', limit: 1 })
  const nextEvent = events.data?.[0]
  const counters = STATS.slice(0, 3)

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden text-[#F5F0E6]"
      style={{
        ...BODY,
        background: 'radial-gradient(ellipse 80% 60% at 70% 0%, #12301F 0%, #0D1F18 45%, #0A1913 100%)',
      }}
    >
      <AmbientGlow />

      <div className="mx-auto grid w-full max-w-[1160px] items-start gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
        <motion.div
          variants={stagger(0.05, 0.09)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-5 lg:col-span-7"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.05] py-1.5 pl-3 pr-4 text-sm text-[#F5F0E6]/85 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#DDA15E]/70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#DDA15E]" />
            </span>
            HSD Bolu • Geliştirici Ekosistemi
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={item}
            style={DISPLAY}
            className="m-0 text-[clamp(2.4rem,1.5rem+4.5vw,4.75rem)] font-light leading-[1.05] tracking-[-0.02em]"
          >
            {HEADLINE.map((line) => (
              <span
                key={line}
                className="block bg-gradient-to-r from-[#DDA15E] via-[#C9B27A] to-[#52B788] bg-clip-text pb-[0.06em] text-transparent"
              >
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="m-0 max-w-xl text-base leading-relaxed text-[#ECE5D8]/75 sm:text-lg">
            {SITE.description}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Link
              to="/katil"
              className="inline-flex min-h-12 transform-gpu items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#EDB679] via-[#DDA15E] to-[#C98A45] px-7 text-base font-semibold text-[#0D1F18] no-underline shadow-[0_10px_30px_-8px_rgba(221,161,94,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F0E6]"
            >
              Topluluğa Katıl
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/etkinlikler"
              className="inline-flex min-h-12 transform-gpu items-center justify-center rounded-full border border-white/25 bg-white/5 px-7 text-base font-medium text-[#F5F0E6] no-underline backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F0E6]"
            >
              Etkinlikleri Keşfet
            </Link>
          </motion.div>

          <motion.dl
            variants={item}
            className="m-0 mt-2 grid w-full max-w-xl grid-cols-3 border-t border-white/10 pt-5"
          >
            {counters.map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col-reverse gap-1 border-l border-white/10 pl-4 first:border-l-0 first:pl-0">
                <dt className="m-0 text-xs leading-snug text-[#ECE5D8]/65 sm:text-sm">
                  {label}
                  {sub && <span className="block text-[11px] text-[#52B788]">{sub}</span>}
                </dt>
                <dd style={DISPLAY} className="m-0 text-3xl font-light leading-none tabular-nums sm:text-4xl">
                  {value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          variants={stagger(0.35, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 lg:col-span-5"
        >
          <motion.article variants={item} className={GLASS} aria-labelledby="focus-title">
            <h2 id="focus-title" style={DISPLAY} className="m-0 text-lg font-normal leading-tight">
              Aktif odaklar
            </h2>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0 text-sm">
              {FOCUS_AREAS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0D1F18]/60 px-3 py-1.5 text-[#F5F0E6]/90"
                >
                  <Icon className="h-4 w-4 text-[#52B788]" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article variants={item} className={GLASS} aria-labelledby="event-title">
            <span className="inline-block rounded-full bg-[#DDA15E]/15 px-2.5 py-0.5 text-xs font-medium text-[#DDA15E]">
              {nextEvent ? (EVENT_TYPES[nextEvent.type] ?? nextEvent.type) : 'Sıradaki etkinlik'}
            </span>
            {events.loading ? (
              <div className="mt-3">
                <Loading compact />
              </div>
            ) : nextEvent ? (
              <>
                <h2 id="event-title" style={DISPLAY} className="m-0 mt-2 text-lg font-normal leading-snug">
                  {nextEvent.title}
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#ECE5D8]/70">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-[#DDA15E]" aria-hidden="true" />
                    {formatDateRange(nextEvent.start_date, nextEvent.end_date)}
                  </span>
                  {nextEvent.location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#DDA15E]" aria-hidden="true" />
                      {nextEvent.location}
                    </span>
                  )}
                  <Link
                    to={`/etkinlikler/${nextEvent.id}`}
                    className="ml-auto inline-flex items-center gap-1 font-semibold text-[#DDA15E] no-underline hover:underline"
                  >
                    Detaylar <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 id="event-title" style={DISPLAY} className="m-0 mt-2 text-lg font-normal leading-snug">
                  Yeni etkinlikler çok yakında
                </h2>
                <p className="mt-2 m-0 text-sm text-[#ECE5D8]/70">
                  Duyurular için{' '}
                  <Link to="/katil" className="font-semibold text-[#DDA15E] no-underline hover:underline">
                    topluluğa katıl
                  </Link>
                  .
                </p>
              </>
            )}
          </motion.article>

          {FEATURED_ARTICLE?.url && (
            <motion.article variants={item} className={GLASS} aria-labelledby="article-title">
              <a
                href={FEATURED_ARTICLE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#F5F0E6] no-underline"
              >
                {FEATURED_ARTICLE.cover && (
                  <img
                    src={FEATURED_ARTICLE.cover}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="80"
                    height="80"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-[#52B788]">Medium Yazısı</span>
                  <h2 id="article-title" style={DISPLAY} className="m-0 mt-0.5 text-base font-normal leading-snug">
                    {FEATURED_ARTICLE.title}
                  </h2>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[#DDA15E]" aria-hidden="true" />
                <span className="visually-hidden">(Medium&apos;da aç)</span>
              </a>
            </motion.article>
          )}
        </motion.div>
      </div>
    </section>
  )
}
