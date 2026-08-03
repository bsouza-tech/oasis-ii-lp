import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Dumbbell, GraduationCap, MapPin, Pill, Play, ShoppingBag, TrainFront, X } from 'lucide-react'
import { ReactLenis, useLenis } from 'lenis/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import oasisSymbol from '../assets/logo-oasis-2.svg'

// ── Hooks ──────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCounter(target: number, duration = 1400, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    setVal(0)
    let start: number | null = null
    let id: number
    const step = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) { id = requestAnimationFrame(step) }
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [active, target, duration])
  return val
}

// ── Icons ──────────────────────────────────────────────────────────────────────

const IconBed = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5" />
    <path d="M2 20v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" />
    <path d="M2 20h20" />
    <path d="M2 9h20" />
    <rect x="7" y="9" width="10" height="4" rx="1" />
  </svg>
)

const IconSun = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const IconLayout = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
)

const IconDoor = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
    <path d="M2 20h20" />
    <path d="M14 12v.01" />
  </svg>
)

const IconBuilding = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22V12h6v10M8 7h.01M12 7h.01M16 7h.01M8 11h.01M16 11h.01" />
  </svg>
)

const IconUsers = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconCheck = ({ size = 20, color = 'white' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconPool = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12h20M2 18c3-3 6 3 9 0s6-3 9 0" />
    <path d="M7 12V8a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconSpa = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C6 22 2 17.5 2 12c5 0 10 2.5 10 10z" />
    <path d="M12 22c6 0 10-4.5 10-10-5 0-10 2.5-10 10z" />
    <path d="M12 6C9 3 9 7 12 9c3-2 3-6 0-3z" />
  </svg>
)

const IconFire = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
)

const IconChef = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6v-7.13z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
)

const IconMountain = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
  </svg>
)

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconAward = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
)

// ── Primitive Components ───────────────────────────────────────────────────────

function PillButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline-navy' | 'outline-white'
  size?: 'md' | 'lg'
  loading?: boolean
  className?: string
}) {
  const base = 'rounded-full font-semibold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer'
  const sizes = { md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }
  const variants = {
    primary: 'bg-orange text-white hover:brightness-110',
    'outline-navy': 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-navy',
  }
  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {loading ? <span className="spinner" /> : children}
    </button>
  )
}

function CircleBadge({ icon, delay = 0, visible = true }: { icon: React.ReactNode; delay?: number; visible?: boolean }) {
  return (
    <div
      className="w-12 h-12 rounded-full bg-orange flex items-center justify-center flex-shrink-0"
      style={visible ? { animation: `badge-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both` } : { opacity: 0 }}
    >
      {icon}
    </div>
  )
}

function PhotoTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full leading-none">
      {label}
    </span>
  )
}

function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-navy">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          rounded-xl px-4 py-3 text-sm bg-white outline-none border transition-all duration-150
          ${error ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-transparent focus:border-orange focus:ring-2 focus:ring-orange/20'}
          text-ink placeholder-ink/40
        `}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// ── Section 1 — Hero ───────────────────────────────────────────────────────────

function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* animated bg image */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Fachada-Diurna_03-scaled.png')",
        }}
      />
      {/* gradient overlay: bottom to cream */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(21,44,65,0.44) 0%, rgba(21,44,65,0.64) 58%, rgba(21,44,65,0.58) 72%, rgba(255,242,229,0.96) 100%)',
        }}
      />

      {/* content */}
      <div className="relative z-10 max-w-3xl mx-auto px-5 py-16 w-full text-center flex flex-col items-center">
        <img
          src="/oasis-logo.png"
          alt="Oásis Residencial"
          className="hero-logo w-36 sm:w-40 md:w-44 h-auto mb-6 drop-shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
        />
        <p className="hero-eyebrow text-orange font-semibold text-xs uppercase tracking-widest mb-3">
          Bairro da Luz · Nova Iguaçu
        </p>
        <h1
          className="hero-headline text-white leading-tight mb-4 max-w-2xl"
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', fontWeight: 800 }}
        >
          As maiores plantas de Nova Iguaçu.
        </h1>
        <p className="hero-sub text-white/75 text-base leading-relaxed mb-8 max-w-xl">
          Plantas inteligentes que sua família vai sentir desde o primeiro dia, num jeito de morar que a maioria dos
          apartamentos da região não oferece.
        </p>
        <div className="hero-cta flex flex-col items-center gap-2">
          <PillButton onClick={onCta} size="lg">Quero receber informações</PillButton>
          <p className="text-white/55 text-xs">Plantas, valores e novidades do Oásis II.</p>
        </div>
      </div>
    </section>
  )
}

// ── Stats bar ──────────────────────────────────────────────────────────────────

function StatsBar() {
  const { ref, inView } = useInView(0.25)
  const stats = [
    { number: '16 anos', label: 'de Gênesis Empreendimentos' },
    { number: '180', label: 'unidades em uma única torre' },
    { number: 'Torre única', label: 'mais privacidade' },
    { number: 'Caixa', label: 'parceria para financiamento' },
  ]
  return (
    <section className="relative overflow-hidden bg-navy border-y border-white/10">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'linear-gradient(110deg, rgba(255,255,255,0.015) 0%, rgba(235,145,89,0.08) 50%, rgba(255,255,255,0.015) 100%)',
        }}
      />
      <div ref={ref} className="relative max-w-5xl mx-auto px-5 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.number}
            className={`stats-reveal relative min-h-[78px] md:min-h-[72px] px-3 md:px-6 py-3 flex flex-col items-center justify-center text-center ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            {i > 0 && (
              <span aria-hidden="true" className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/10" />
            )}
            {i % 2 === 1 && (
              <span aria-hidden="true" className="md:hidden absolute left-0 top-3 bottom-3 w-px bg-white/10" />
            )}
            {i >= 2 && (
              <span aria-hidden="true" className="md:hidden absolute top-0 left-4 right-4 h-px bg-white/10" />
            )}
            <span aria-hidden="true" className="w-6 h-0.5 rounded-full bg-orange/70 mb-2" />
            <span
              className="text-orange font-extrabold text-xl md:text-2xl tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {s.number}
            </span>
            <span className="text-white/55 text-[11px] md:text-xs mt-2 leading-snug max-w-[11rem]">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Section 3 — Proof of Space ────────────────────────────────────────────────

const spaceCards = [
  {
    icon: <IconBed />,
    title: 'Quarto infantil quase do tamanho da suíte',
    desc: 'Em algumas plantas, o segundo quarto chega perto da metragem da suíte principal.',
  },
  {
    icon: <IconSun />,
    title: 'Duas varandas em determinadas plantas',
    desc: 'Mais luz, mais ventilação e mais lugar para a família se espalhar.',
  },
  {
    icon: <IconLayout />,
    title: 'Plantas pensadas, não só desenhadas',
    desc: 'Distribuição que aproveita cada canto, sem metro quadrado sobrando em corredor.',
  },
  {
    icon: <IconDoor />,
    title: 'Amplitude que aparece na entrada',
    desc: 'O efeito de espaço começa assim que a porta abre.',
  },
]

function ProofOfSpace({ onCta }: { onCta: () => void }) {
  const { ref, inView } = useInView(0.12)

  return (
    <section className="relative py-16 md:py-28 px-5 bg-transparent">
      <div ref={ref} className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-6 md:gap-14 items-end mb-8 md:mb-16">
          <div
            className={`card-enter ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <span aria-hidden="true" className="h-px w-9 bg-orange" />
              <p className="text-orange font-bold text-xs uppercase tracking-[0.18em]">Espaço que você percebe</p>
            </div>
            <h2
              className="text-navy leading-[1.05] max-w-2xl"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.6rem)', fontWeight: 800 }}
            >
              Metro quadrado que sobra, não que falta.
            </h2>
          </div>

          <div
            className={`card-enter relative border-l-2 border-orange/60 pl-5 md:pl-7 py-1 ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="text-ink/60 text-sm md:text-base leading-relaxed">
              Quem conhece as plantas do Oásis II repete a mesma observação:
              <strong className="block mt-2 text-navy font-bold">
                o apartamento parece maior por dentro do que qualquer foto consegue mostrar.
              </strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-5">
          {spaceCards.map((card, i) => (
            <div
              key={i}
              className={`space-card card-enter relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-navy/10 bg-white p-4 md:p-8 shadow-[0_14px_40px_rgba(30,60,88,0.08)] ${i === 0 || i === 3 ? 'md:col-span-7' : 'md:col-span-5'} ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: `${180 + i * 90}ms` }}
            >
              <div aria-hidden="true" className="absolute top-0 left-4 right-4 md:left-8 md:right-8 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent" />
              <span
                aria-hidden="true"
                className="absolute -right-1 -bottom-6 md:-right-2 md:-bottom-10 text-navy/[0.04] md:text-navy/[0.035] font-extrabold leading-none select-none"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="relative flex flex-col md:flex-row gap-3 md:gap-5 items-start">
                <CircleBadge icon={card.icon} delay={inView ? i * 90 + 300 : 0} visible={inView} />
                <div className="pt-0.5 min-w-0">
                  <span className="text-orange/70 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
                    Detalhe {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-navy font-extrabold text-sm md:text-lg mt-1.5 md:mt-2 mb-1.5 md:mb-2 leading-snug"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-ink/60 text-xs md:text-sm leading-relaxed max-w-md">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-8 md:mt-12 flex justify-center card-enter ${inView ? 'visible' : ''}`} style={{ transitionDelay: '520ms' }}>
          <PillButton onClick={onCta} size="lg">Quero ver as plantas</PillButton>
        </div>
      </div>
    </section>
  )
}

// ── Section 4A — Exclusivity counter ─────────────────────────────────────────

function ExclusivityBlock() {
  const { ref, inView } = useInView(0.18)
  const towerCount = useCounter(1, 900, inView)
  const unitCount = useCounter(180, 1400, inView)

  return (
    <section className="relative px-5 pt-2 pb-8 md:pb-10 bg-transparent">
      <div ref={ref} className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-8 md:gap-14 items-end mb-12 md:mb-14">
          <div
            className={`card-enter ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden="true" className="h-px w-9 bg-orange" />
              <p className="text-orange font-bold text-xs uppercase tracking-[0.18em]">Torre única</p>
            </div>
            <h2
              className="text-navy leading-[1.05] max-w-2xl"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.3rem, 5vw, 3.6rem)', fontWeight: 800 }}
            >
              180 apartamentos. Nenhum a mais.
            </h2>
          </div>

          <div
            className={`card-enter relative border-l-2 border-orange/60 pl-6 md:pl-7 py-1 ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <p className="text-ink/60 text-base leading-relaxed">
              A maioria dos condomínios da região multiplica torres para multiplicar unidades.
              <strong className="block mt-2 text-navy font-bold">
                No Oásis II, uma torre única significa menos gente dividindo o elevador, a garagem e o lazer.
              </strong>
            </p>
          </div>
        </div>

        <div
          className={`card-enter relative overflow-hidden rounded-[32px] bg-navy px-7 py-10 md:px-12 md:py-12 shadow-[0_28px_70px_rgba(30,60,88,0.18)] ${inView ? 'visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div aria-hidden="true" className="absolute -top-36 left-1/2 -translate-x-1/2 w-[34rem] h-[20rem] rounded-full bg-orange/10 blur-3xl" />
          <div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent" />

          <p className="relative text-center text-white/45 text-[10px] font-bold uppercase tracking-[0.24em] mb-9">
            Exclusividade em números
          </p>

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-12">
            <div className="text-center">
              <span
                className="block text-orange font-extrabold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4.8rem, 10vw, 7.5rem)', lineHeight: 0.8 }}
              >
                {String(towerCount).padStart(2, '0')}
              </span>
              <span className="text-white font-bold text-lg mt-5 block" style={{ fontFamily: 'var(--font-display)' }}>
                torre única
              </span>
              <span className="text-white/45 text-xs mt-1 block">mais privacidade no dia a dia</span>
            </div>

            <div aria-hidden="true" className="relative h-px w-full md:h-28 md:w-px bg-white/10">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange shadow-[0_0_0_7px_rgba(235,145,89,0.12)]" />
            </div>

            <div className="text-center">
              <span
                className="block text-orange font-extrabold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4.8rem, 10vw, 7.5rem)', lineHeight: 0.8 }}
              >
                {unitCount}
              </span>
              <span className="text-white font-bold text-lg mt-5 block" style={{ fontFamily: 'var(--font-display)' }}>
                unidades no total
              </span>
              <span className="text-white/45 text-xs mt-1 block">em um único endereço</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section 4B — Rooftop photo grid ───────────────────────────────────────────

const rooftopPhotos = [
  {
    src: 'https://wp.oasis2.com.br/wp-content/uploads/2026/02/GN-Oasis_2-Benfeitoria-Piscina_01-scaled.png',
    label: 'Piscina',
    span: 'md:col-span-7 md:row-span-2',
  },
  {
    src: 'https://wp.oasis2.com.br/wp-content/uploads/2026/02/GN-Oasis_2-Benfeitoria-SPA_01-scaled.png',
    label: 'SPA',
    span: 'md:col-span-5',
  },
  {
    src: 'https://wp.oasis2.com.br/wp-content/uploads/2026/02/GN-Oasis_2-Benfeitoria-Sauna_01-scaled.png',
    label: 'Sauna',
    span: 'md:col-span-5',
  },
  {
    src: 'https://wp.oasis2.com.br/wp-content/uploads/2026/02/GN-Oasis_2-Benfeitoria-SalaoFestas_01-scaled.png',
    label: 'Espaço gourmet',
    span: 'md:col-span-5',
  },
  {
    src: 'https://wp.oasis2.com.br/wp-content/uploads/2026/02/GN-Oasis_2-Benfeitoria-Churrasqueira_03-scaled.png',
    label: 'Churrasqueira',
    span: 'md:col-span-7',
  },
  {
    src: 'https://wp.oasis2.com.br/wp-content/uploads/2026/02/GN-Oasis_2-Benfeitoria-Academia_01-scaled.png',
    label: 'Academia',
    span: 'md:col-span-12',
  },
]

function RooftopLightbox({
  index,
  onClose,
  onIndexChange,
}: {
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}) {
  const lenis = useLenis()
  const reduceMotion = useReducedMotion()
  const photo = rooftopPhotos[index]
  const total = rooftopPhotos.length
  const touchStartX = useRef<number | null>(null)

  const goPrev = () => onIndexChange((index - 1 + total) % total)
  const goNext = () => onIndexChange((index + 1) % total)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + total) % total)
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % total)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      lenis?.start()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [index, lenis, onClose, onIndexChange, total])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.22 }}
      className="fixed inset-0 z-[110] flex flex-col bg-navy-dark/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria do rooftop — ${photo.label}`}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-white md:text-sm" style={{ fontFamily: 'var(--font-display)' }}>
            {photo.label}
          </p>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
            {index + 1} de {total}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange md:h-11 md:w-11"
          aria-label="Fechar galeria"
        >
          <X size={18} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 md:px-20"
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return
          const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current
          touchStartX.current = null
          if (Math.abs(delta) < 48) return
          if (delta > 0) goPrev()
          else goNext()
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-orange md:flex"
          aria-label="Imagem anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={photo.src}
            src={photo.src}
            alt={photo.label}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-full max-w-full select-none rounded-xl object-contain shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:rounded-2xl"
            draggable={false}
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-orange md:flex"
          aria-label="Próxima imagem"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="border-t border-white/10 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:px-8 md:pb-6 md:pt-4">
        <div className="mx-auto flex max-w-md items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={goPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white active:bg-orange"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {photo.label}
            </p>
            <div className="mx-auto mt-2 h-1 max-w-[10rem] overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-orange transition-all duration-300"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={goNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white active:bg-orange"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="hidden items-center justify-center gap-2 md:flex">
          {rooftopPhotos.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Ir para ${item.label}`}
              aria-current={i === index ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-orange' : 'w-2 bg-white/30 hover:bg-white/55'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function RooftopBlock({ onCta }: { onCta: () => void }) {
  const { ref, inView } = useInView(0.08)
  const reduceMotion = useReducedMotion()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-28 px-5 bg-navy">
        <div aria-hidden="true" className="absolute -top-48 -right-32 w-[38rem] h-[38rem] rounded-full bg-teal/10 blur-3xl" />
        <div aria-hidden="true" className="absolute top-[45%] -left-48 w-[32rem] h-[32rem] rounded-full bg-orange/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute top-8 right-0 h-56 w-56 translate-x-1/2 opacity-[0.16] sm:h-64 sm:w-64 md:top-1/2 md:h-[34rem] md:w-[34rem] md:-translate-y-1/2 md:opacity-[0.13]">
          <motion.img
            src={oasisSymbol}
            alt=""
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
            className="h-full w-full"
          />
        </div>

        <div ref={ref} className="relative max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-14 md:mb-20">
            <div
              className={`card-enter md:col-span-8 ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span aria-hidden="true" className="h-px w-9 bg-orange" />
                <p className="text-orange font-bold text-xs uppercase tracking-[0.18em]">Lazer no topo</p>
              </div>
              <h2
                className="text-white leading-[1.05] max-w-2xl"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.3rem, 5vw, 3.6rem)', fontWeight: 800 }}
              >
                Um rooftop que funciona como extensão da sua casa.
              </h2>
            </div>

            <div
              className={`card-enter relative md:col-span-4 md:translate-y-6 border-l-2 border-orange/60 pl-6 md:pl-8 py-1 ${inView ? 'visible' : ''}`}
              style={{ transitionDelay: '120ms' }}
            >
              <p className="text-white/55 text-base leading-relaxed">
                Cada espaço foi pensado para funcionar bem no dia a dia,
                <strong className="block mt-2 text-white font-bold">não só nas fotos de divulgação.</strong>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[190px_190px_240px_320px] gap-5 md:gap-6">
            {rooftopPhotos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className={`relative h-[260px] md:h-auto overflow-hidden rounded-[24px] group border border-white/10 bg-navy-dark shadow-[0_20px_50px_rgba(0,0,0,0.18)] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${photo.span} card-enter ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${180 + i * 90}ms` }}
                aria-label={`Ampliar foto: ${photo.label}`}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(21,44,65,0.9) 0%, rgba(21,44,65,0.08) 58%, transparent 100%)' }}
                />
                <span className="absolute top-4 right-4 text-white/55 text-[10px] font-bold tracking-[0.2em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
                  <PhotoTag label={photo.label} />
                </div>
              </button>
            ))}
          </div>

          <div className={`mt-12 flex flex-col items-center gap-3 card-enter ${inView ? 'visible' : ''}`} style={{ transitionDelay: '720ms' }}>
            <PillButton onClick={onCta} size="lg">Quero conhecer o lazer</PillButton>
            <p className="text-xs text-white/40">Receba fotos, plantas e condições.</p>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <RooftopLightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onIndexChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ── Section 4C — Location ─────────────────────────────────────────────────────

const locationPoints = [
  {
    icon: ShoppingBag,
    name: 'Shopping Nova Iguaçu',
    detail: 'Compras, serviços e lazer por perto',
    layout: 'sm:col-span-2 lg:col-span-4',
    featured: true,
  },
  {
    icon: Pill,
    name: 'Farmácias',
    detail: 'Conveniência para o dia a dia',
    layout: 'sm:col-span-1 lg:col-span-4',
  },
  {
    icon: GraduationCap,
    name: 'Escolas',
    detail: 'Educação perto de casa',
    layout: 'sm:col-span-1 lg:col-span-4',
  },
  {
    icon: Dumbbell,
    name: 'Academias',
    detail: 'Rotina ativa no entorno',
    layout: 'sm:col-span-1 lg:col-span-6',
  },
  {
    icon: TrainFront,
    name: 'Estação de trem',
    detail: 'Mobilidade para toda a cidade',
    layout: 'sm:col-span-1 lg:col-span-6',
  },
]

function LocationBlock({ onCta }: { onCta: () => void }) {
  const { ref, inView } = useInView(0.12)
  const reduceMotion = useReducedMotion()

  return (
    <section id="localizacao" className="relative overflow-hidden bg-cream px-5 py-16 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-orange/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-navy/7 blur-3xl" />

      <div ref={ref} className="relative mx-auto max-w-7xl">
        <div className="mb-8 grid items-end gap-6 md:mb-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <div className="mb-3 flex items-center gap-3 text-orange md:mb-4">
              <span className="h-px w-9 bg-orange/70" />
              <MapPin size={15} strokeWidth={2.2} aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Bairro da Luz</p>
            </div>
            <h2
              className="max-w-4xl text-navy leading-[1.05]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800 }}
            >
              Um endereço que resolve o dia a dia, não só o fim de semana.
            </h2>
          </div>

          <div className="border-l-2 border-orange/55 pl-5 md:pl-6 lg:mb-1">
            <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
              Shopping Nova Iguaçu, escolas e comércio no entorno, sem precisar atravessar a cidade.
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/45 md:mt-4">
              O essencial na sua rotina
            </p>
          </div>
        </div>

        {/* Mobile: compact list */}
        <ul className="overflow-hidden rounded-[1.35rem] border border-navy/10 bg-white shadow-[0_14px_40px_rgba(26,58,87,0.07)] sm:hidden">
          {locationPoints.map((pt, index) => {
            const Icon = pt.icon
            const featured = pt.featured === true

            return (
              <motion.li
                key={pt.name}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-3.5 px-4 py-3.5 ${
                  index > 0 ? 'border-t border-navy/8' : ''
                } ${featured ? 'bg-navy' : ''}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    featured ? 'bg-orange text-white' : 'bg-orange/10 text-orange'
                  }`}
                  aria-hidden="true"
                >
                  <Icon size={18} strokeWidth={1.9} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate text-[0.95rem] font-bold leading-tight ${featured ? 'text-white' : 'text-navy'}`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {pt.name}
                  </h3>
                  <p className={`mt-0.5 truncate text-xs leading-snug ${featured ? 'text-white/55' : 'text-ink/50'}`}>
                    {pt.detail}
                  </p>
                </div>
                <span className={`shrink-0 text-[10px] font-semibold tracking-[0.16em] ${featured ? 'text-white/30' : 'text-navy/25'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.li>
            )
          })}
        </ul>

        {/* Tablet/Desktop cards */}
        <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {locationPoints.map((pt, index) => {
            const Icon = pt.icon
            const featured = pt.featured === true

            return (
              <motion.article
                key={pt.name}
                initial={reduceMotion ? false : 'hidden'}
                animate={inView || reduceMotion ? 'visible' : 'hidden'}
                whileHover={reduceMotion ? undefined : 'hover'}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.62, delay: reduceMotion ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] },
                  },
                  hover: { y: -6, transition: { duration: 0.22 } },
                }}
                className={`group relative min-h-[190px] overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_18px_55px_rgba(26,58,87,0.08)] md:p-7 ${pt.layout} ${
                  featured
                    ? 'border-navy bg-navy text-white'
                    : 'border-navy/8 bg-white/90 text-navy backdrop-blur-sm'
                }`}
              >
                {featured && (
                  <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 opacity-[0.13]">
                    <motion.img
                      src={oasisSymbol}
                      alt=""
                      aria-hidden="true"
                      animate={reduceMotion ? undefined : { rotate: 360 }}
                      transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
                      className="h-full w-full"
                    />
                  </div>
                )}

                <div className="relative flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between">
                    <motion.div
                      variants={{
                        hidden: { scale: 0.72, rotate: -10 },
                        visible: {
                          scale: 1,
                          rotate: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 260,
                            damping: 18,
                            delay: reduceMotion ? 0 : 0.18 + index * 0.08,
                          },
                        },
                        hover: {
                          rotate: [0, -9, 8, 0],
                          scale: [1, 1.16, 1],
                          transition: { duration: 0.55 },
                        },
                      }}
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        featured ? 'bg-orange text-white' : 'bg-orange/10 text-orange'
                      }`}
                      aria-hidden="true"
                    >
                      <Icon size={23} strokeWidth={1.9} />
                    </motion.div>

                    <span className={`text-xs font-semibold tracking-[0.18em] ${featured ? 'text-white/35' : 'text-navy/25'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`text-xl font-bold leading-tight ${featured ? 'text-white' : 'text-navy'}`}
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {pt.name}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed ${featured ? 'text-white/55' : 'text-ink/50'}`}>
                      {pt.detail}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center md:mt-12">
          <PillButton onClick={onCta} size="lg">Quero receber informações</PillButton>
        </div>
      </div>
    </section>
  )
}

// ── Section 5 — Credibility ────────────────────────────────────────────────────

const credBadges = [
  { icon: <IconCalendar />, text: '16 anos de Gênesis Empreendimentos' },
  { icon: <IconShield />, text: 'Parceria Caixa para financiamento' },
  { icon: <IconAward />, text: 'Histórico de entregas na região' },
]

const partnerLogos = [
  { src: '/partners/caixa.png', alt: 'Caixa', label: 'Parceira para financiamento' },
  { src: '/partners/nivel-a.png', alt: 'Nível A', label: 'Execução de obras de edificações' },
  { src: '/partners/pbqp-h.png', alt: 'PBQP-H', label: 'Qualidade e produtividade do habitat' },
  { src: '/partners/iso-9001.png', alt: 'ISO 9001', label: 'Gestão da qualidade certificada' },
]

function CredibilityBlock({ onCta }: { onCta: () => void }) {
  const { ref, inView } = useInView(0.12)
  const reduceMotion = useReducedMotion()
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section id="quem-constroi" className="relative bg-cream px-5 pb-24 md:pb-28">
      <div ref={ref} className="mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 34 }}
          animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.25rem] bg-navy shadow-[0_30px_90px_rgba(20,53,81,0.18)]"
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-[22rem] w-[22rem] opacity-[0.13] md:h-[26rem] md:w-[26rem]">
            <motion.img
              src={oasisSymbol}
              alt=""
              aria-hidden="true"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
              className="h-full w-full"
            />
          </div>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex flex-col justify-center p-8 md:p-11 lg:p-14">
              <div className="mb-4 flex items-center gap-3 text-orange">
                <span className="h-px w-9 bg-orange/70" />
                <p className="text-xs font-semibold uppercase tracking-[0.2em]">Quem constrói</p>
              </div>
              <h2
                className="max-w-xl text-white leading-[1.06]"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)', fontWeight: 800 }}
              >
                16 anos entregando o que promete.
              </h2>

              <div className="mt-9 divide-y divide-white/10">
                {credBadges.map((badge, index) => (
                  <motion.div
                    key={badge.text}
                    initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                    animate={inView || reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                    transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.18 + index * 0.08 }}
                    className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-orange/12 text-orange">
                      {badge.icon}
                    </div>
                    <span className="text-sm font-medium text-white/78 md:text-base">{badge.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-9">
                <PillButton onClick={onCta} size="lg">Falar com a equipe</PillButton>
              </div>
            </div>

            <div className="relative p-3 md:p-5 lg:p-6 lg:pl-0">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={inView || reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex min-h-[340px] h-full items-center justify-center overflow-hidden rounded-[1.65rem] bg-[#102f4a] md:min-h-[440px]"
              >
                {videoOpen ? (
                  <div className="absolute inset-0 bg-black">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/6LLH0JHJvVE?autoplay=1&rel=0&modestbranding=1&playsinline=1"
                      title="Teaser do Oásis II"
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                    <button
                      type="button"
                      onClick={() => setVideoOpen(false)}
                      className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-navy/75 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                      aria-label="Fechar teaser do Oásis II"
                    >
                      <X size={19} strokeWidth={2} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    className="absolute inset-0 flex cursor-pointer items-center justify-center overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange"
                    aria-label="Reproduzir teaser do Oásis II nesta página"
                  >
                    <img
                      src="https://wp.oasis2.com.br/wp-content/uploads/2026/04/GN-Oasis_2-Fachada-Diurna_03-scaled.png"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-46 transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-navy/10" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(20,53,81,0.18)_72%)]" />

                    <div className="relative flex flex-col items-center px-6 text-center">
                      <motion.span
                        animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-white/14 text-white shadow-[0_12px_45px_rgba(0,0,0,0.24)] backdrop-blur-md transition-colors group-hover:bg-orange"
                        aria-hidden="true"
                      >
                        <Play size={28} strokeWidth={1.8} fill="currentColor" className="ml-1" />
                      </motion.span>
                      <span className="mt-5 text-lg font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                        Teaser Oásis II
                      </span>
                      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/48">
                        Assistir agora
                      </span>
                    </div>

                    <span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-navy/45 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60 backdrop-blur-md">
                      Gênesis Empreendimentos
                    </span>
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 md:mt-14">
          <div className="mb-5 flex flex-col justify-between gap-3 md:mb-7 md:flex-row md:items-end md:gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">Certificações e parceiros</p>
              <h3
                className="mt-2 max-w-2xl text-navy leading-tight md:mt-3"
                style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.45rem, 3vw, 2.4rem)', fontWeight: 800 }}
              >
                Credenciais que você pode conferir.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink/52 md:text-right">
              Qualidade de obra, gestão certificada e parceria para tornar a compra mais segura.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {partnerLogos.map((partner, index) => (
              <motion.div
                key={partner.alt}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { y: -5, transition: { duration: 0.2 } }}
                className="flex min-h-[148px] flex-col items-center justify-center rounded-[1.25rem] bg-white/90 p-3 text-center shadow-[0_14px_40px_rgba(26,58,87,0.07)] md:min-h-[180px] md:rounded-[1.5rem] md:p-4"
              >
                <img src={partner.src} alt={partner.alt} className="h-20 w-20 object-contain md:h-28 md:w-28" />
                <p className="mt-2 text-[11px] font-medium leading-snug text-ink/52 md:mt-2.5 md:text-xs md:leading-relaxed">{partner.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Section 6 — Lead capture ───────────────────────────────────────────────────

function LeadCta({ onOpen }: { onOpen: () => void }) {
  const reduceMotion = useReducedMotion()

  return (
    <section id="cadastro" className="relative overflow-hidden bg-navy px-5 py-20 md:py-24">
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-[26rem] w-[26rem] -translate-y-1/2 translate-x-1/2 opacity-[0.13] md:h-[34rem] md:w-[34rem] lg:h-[36rem] lg:w-[36rem]">
        <motion.img
          src={oasisSymbol}
          alt=""
          aria-hidden="true"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 72, repeat: Infinity, ease: 'linear' }}
          className="h-full w-full"
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <div className="mb-4 flex items-center gap-3 text-orange">
            <span className="h-px w-9 bg-orange/70" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Conheça o Oásis II</p>
          </div>
          <h2
            className="max-w-4xl text-white leading-[1.06]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.15rem, 4.5vw, 3.8rem)', fontWeight: 800 }}
          >
            Receba plantas, valores e novidades em primeira mão.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/58">
            Faça um cadastro rápido para acessar todas as informações do empreendimento.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-center">
          <PillButton onClick={onOpen} size="lg" className="min-w-[260px]">
            Quero receber informações
          </PillButton>
          <p className="text-xs text-white/40">Leva menos de um minuto.</p>
        </div>
      </div>
    </section>
  )
}

function LeadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const firstInput = dialogRef.current?.querySelector<HTMLInputElement>('input')
    window.setTimeout(() => firstInput?.focus(), 120)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: { name?: string; email?: string; phone?: string } = {}
    if (!name.trim()) nextErrors.name = 'Informe seu nome'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Informe um e-mail válido'
    if (phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Informe um telefone válido'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-navy/72 p-4 backdrop-blur-md md:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-cream shadow-[0_35px_120px_rgba(4,20,34,0.42)]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy/[0.06] text-navy/55 transition-colors hover:bg-navy hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
              aria-label="Fechar cadastro"
            >
              <X size={18} />
            </button>

            <div className="p-7 pt-9 md:p-9 md:pt-10">
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-5 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white">
                    <IconCheck size={25} />
                  </div>
                  <h3 id="lead-modal-title" className="text-2xl font-bold text-navy" style={{ fontFamily: 'var(--font-display)' }}>
                    Cadastro recebido!
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-ink/60">
                    Em breve, nossa equipe entrará em contato com as informações do Oásis II.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 text-sm font-semibold text-orange transition-colors hover:text-navy"
                  >
                    Fechar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="mb-2 pr-12">
                    <h2
                      id="lead-modal-title"
                      className="text-navy leading-tight"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.65rem, 5vw, 2.15rem)', fontWeight: 800 }}
                    >
                      Receba informações do Oásis II.
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink/52">
                      Preencha seus dados para receber plantas, valores e novidades do empreendimento.
                    </p>
                  </div>
                  <FormField
                    label="Nome"
                    placeholder="Seu nome"
                    value={name}
                    onChange={setName}
                    error={errors.name}
                  />
                  <FormField
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={setEmail}
                    error={errors.email}
                  />
                  <FormField
                    label="Telefone"
                    type="tel"
                    placeholder="(21) 9 9999-0000"
                    value={phone}
                    onChange={setPhone}
                    error={errors.phone}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
                  >
                    {submitting ? <span className="spinner" /> : 'Quero receber informações'}
                  </button>
                  <p className="text-center text-[11px] leading-relaxed text-ink/40">
                    Seus dados serão usados apenas para o contato sobre o Oásis II.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Section 7 — Footer ────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-dark px-5 pb-8 pt-16 md:pt-20">
      <div className="pointer-events-none absolute -bottom-56 -left-32 h-[32rem] w-[32rem] rounded-full bg-teal/[0.05] blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange/55 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-md">
          <img
            src="https://wp.oasis2.com.br/wp-content/uploads/2026/02/SR-GN-Int-Logo-Horizontal-azulbranco.png"
            alt="Gênesis Empreendimentos"
            className="h-12 w-auto object-contain object-left md:h-14"
          />
          <p className="mt-6 text-sm leading-7 text-white/58">
            Há 16 anos, a Gênesis transforma projetos em lugares pensados para viver bem — com qualidade, compromisso e atenção a cada detalhe.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/48">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" />
            Oásis II · Nova Iguaçu
          </div>
        </div>

        <div className="mt-14 border-t border-white/8 pt-7 md:mt-16">
          <p className="max-w-6xl text-[11px] leading-relaxed text-white/28">
            As imagens e perspectivas deste material são meramente ilustrativas e podem sofrer alterações. As áreas comuns e as tipologias estão sujeitas ao memorial descritivo e à documentação legal do empreendimento. Consulte as condições comerciais e a documentação oficial no momento da compra.
          </p>
          <div className="mt-6 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <a
              href="https://oasis2.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/42 transition-colors hover:text-orange"
            >
              Política de Privacidade
            </a>
            <p className="text-white/35">
              © {new Date().getFullYear()} · Desenvolvido por{' '}
              <a
                href="https://genesisempreendimentos.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-orange transition-colors hover:text-white"
              >
                Gênesis Empreendimentos
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── App ────────────────────────────────────────────────────────────────────────

function LenisPause({ paused }: { paused: boolean }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
  }, [lenis, paused])

  return null
}

export default function App() {
  const [leadOpen, setLeadOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const openLead = () => setLeadOpen(true)

  return (
    <>
      {!reduceMotion && (
        <ReactLenis
          root
          options={{
            lerp: 0.08,
            duration: 1.2,
            smoothWheel: true,
            anchors: true,
          }}
        />
      )}
      <LenisPause paused={leadOpen} />
      <div className="bg-cream">
        <Hero onCta={openLead} />
        <StatsBar />
        <div className="relative overflow-hidden bg-cream">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute top-16 -right-28 w-[34rem] h-[34rem] rounded-full bg-orange/10 blur-3xl" />
            <div className="absolute top-[46rem] -left-28 w-[32rem] h-[32rem] rounded-full bg-teal/10 blur-3xl" />
            <div className="absolute bottom-20 right-0 w-[30rem] h-[30rem] rounded-full bg-orange/[0.06] blur-3xl" />
          </div>
          <ProofOfSpace onCta={openLead} />
          <ExclusivityBlock />
          <div aria-hidden="true" className="h-24 md:h-32 bg-gradient-to-b from-transparent via-navy/15 to-navy" />
        </div>
        <RooftopBlock onCta={openLead} />
        <LocationBlock onCta={openLead} />
        <CredibilityBlock onCta={openLead} />
        <LeadCta onOpen={openLead} />
        <Footer />
        <LeadModal open={leadOpen} onClose={() => setLeadOpen(false)} />
      </div>
    </>
  )
}
