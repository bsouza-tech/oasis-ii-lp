import { useInView } from '../../lib/hooks.js'

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


export default StatsBar
