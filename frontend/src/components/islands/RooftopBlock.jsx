import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useInView } from '../../lib/hooks.js'
import { scrollToLeadForm } from '../../lib/scrollToLead.js'
import { PillButton, PhotoTag } from '../../lib/ui.jsx'

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
}) {
  const reduceMotion = useReducedMotion()
  const photo = rooftopPhotos[index]
  const total = rooftopPhotos.length
  const touchStartX = useRef(null)

  const goPrev = () => onIndexChange((index - 1 + total) % total)
  const goNext = () => onIndexChange((index + 1) % total)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.dispatchEvent(new CustomEvent('pause-scroll'))

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + total) % total)
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % total)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.dispatchEvent(new CustomEvent('resume-scroll'))
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [index, onClose, onIndexChange, total])

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


function RooftopBlock() {
  const { ref, inView } = useInView(0.08)
  const reduceMotion = useReducedMotion()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-28 px-5 bg-navy">
        <div aria-hidden="true" className="absolute -top-48 -right-32 w-[38rem] h-[38rem] rounded-full bg-teal/10 blur-3xl" />
        <div aria-hidden="true" className="absolute top-[45%] -left-48 w-[32rem] h-[32rem] rounded-full bg-orange/[0.07] blur-3xl" />
        <div className="pointer-events-none absolute top-8 right-0 h-56 w-56 translate-x-1/2 opacity-[0.16] sm:h-64 sm:w-64 md:top-1/2 md:h-[34rem] md:w-[34rem] md:-translate-y-1/2 md:opacity-[0.13]">
          <motion.img
            src="/logo-svg.svg"
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
            <PillButton onClick={scrollToLeadForm} size="lg">Quero visitar o Oásis II</PillButton>
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


export default RooftopBlock
