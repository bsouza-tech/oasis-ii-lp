import { motion, useReducedMotion } from 'motion/react'
import OpenLeadButton from './OpenLeadButton.jsx'

function LeadCta() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="cadastro" className="relative overflow-hidden bg-navy px-5 py-20 md:py-24">
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-0 h-[26rem] w-[26rem] -translate-y-1/2 translate-x-1/2 opacity-[0.13] md:h-[34rem] md:w-[34rem] lg:h-[36rem] lg:w-[36rem]">
        <motion.img
          src="/logo-svg.svg"
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
            Conheça pessoalmente as plantas do Oásis II.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/58">
            Agende uma visita e descubra como os ambientes amplos e os layouts inteligentes transformam a rotina da sua
            família.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-center">
          <OpenLeadButton className="min-w-[260px]">Agendar uma visita</OpenLeadButton>
          <p className="text-xs text-white/40">Nossa equipe entra em contato para combinar o melhor horário.</p>
        </div>
      </div>
    </section>
  )
}

export default LeadCta
