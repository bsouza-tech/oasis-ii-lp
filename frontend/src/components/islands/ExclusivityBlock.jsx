import { useInView, useCounter } from '../../lib/hooks.js'

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


export default ExclusivityBlock
