import { Dumbbell, GraduationCap, MapPin, Pill, ShoppingBag, TrainFront } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useInView } from '../../lib/hooks.js'
import { scrollToLeadForm } from '../../lib/scrollToLead.js'
import { PillButton } from '../../lib/ui.jsx'

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

function LocationBlock() {
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
                      src="/logo-svg.svg"
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
          <PillButton onClick={scrollToLeadForm} size="lg">Agendar uma visita ao Oásis II</PillButton>
        </div>
      </div>
    </section>
  )
}


export default LocationBlock
