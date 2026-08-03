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
            Receba plantas, valores e novidades em primeira mão.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/58">
            Faça um cadastro rápido para acessar todas as informações do empreendimento.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-center">
          <OpenLeadButton className="min-w-[260px]">Quero me cadastrar</OpenLeadButton>
          <p className="text-xs text-white/40">Leva menos de um minuto.</p>
        </div>
      </div>
    </section>
  )
}

export default LeadCta
