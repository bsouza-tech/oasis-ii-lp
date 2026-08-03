import { useState } from 'react'
import { Play, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useInView } from '../../lib/hooks.js'
import { IconCalendar, IconShield, IconAward } from '../../lib/icons.jsx'
import { scrollToLeadForm } from '../../lib/scrollToLead.js'
import { PillButton } from '../../lib/ui.jsx'

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

function CredibilityBlock() {
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
              src="/logo-svg.svg"
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
                <PillButton onClick={scrollToLeadForm} size="lg">Falar com a equipe</PillButton>
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


export default CredibilityBlock
