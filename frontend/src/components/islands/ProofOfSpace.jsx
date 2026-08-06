import { useInView } from '../../lib/hooks.js'
import { IconBed, IconSun, IconLayout, IconDoor } from '../../lib/icons.jsx'
import { scrollToLeadForm } from '../../lib/scrollToLead.js'
import { PillButton, CircleBadge } from '../../lib/ui.jsx'

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

function ProofOfSpace() {
  const { ref, inView } = useInView(0.12)

  return (
    <section id="plantas" className="relative py-16 md:py-28 px-5 bg-transparent">
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
          <PillButton onClick={scrollToLeadForm} size="lg">Conhecer as plantas pessoalmente</PillButton>
        </div>
      </div>
    </section>
  )
}


export default ProofOfSpace
