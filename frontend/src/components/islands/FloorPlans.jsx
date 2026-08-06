import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  floorPlanCategories,
  floorPlans,
  getFloorPlanById,
  getPlansByCategory,
} from '../../data/floorPlans.js'
import { openLeadModal } from '../../lib/scrollToLead.js'

const INITIAL_PLAN_ID = 'tipo-1-3-quartos'
const TOTAL_PLANS = floorPlans.length

function getPlanHighlights(plan) {
  const items = [`${String(plan.bedrooms).padStart(2, '0')} quartos`]
  if (plan.variant) items.push(plan.variant)
  else if (plan.categoryLabel) items.push(plan.categoryLabel)
  if (plan.area) items.push(plan.area)
  return items
}

function FloorPlans() {
  const reduceMotion = useReducedMotion()
  const initialPlan = getFloorPlanById(INITIAL_PLAN_ID)
  const [categoryId, setCategoryId] = useState(initialPlan.category)
  const [planId, setPlanId] = useState(initialPlan.id)
  const [imageStatus, setImageStatus] = useState('loading')
  const [imageRetry, setImageRetry] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const skipResumeOnLightboxClose = useRef(false)
  const expandButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const touchStartX = useRef(null)
  const imageRef = useRef(null)

  const plansInCategory = getPlansByCategory(categoryId)
  const activePlan = getFloorPlanById(planId)
  const highlights = getPlanHighlights(activePlan)
  const planIndex = Math.max(
    0,
    floorPlans.findIndex((plan) => plan.id === planId),
  )

  const resolveImageStatus = (img) => {
    if (!img) return
    if (img.complete) {
      setImageStatus(img.naturalWidth > 0 ? 'loaded' : 'error')
    }
  }

  useEffect(() => {
    setImageStatus('loading')
    const frame = window.requestAnimationFrame(() => {
      resolveImageStatus(imageRef.current)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [planId, imageRetry])

  const goToPlanIndex = (nextIndex) => {
    const wrapped = (nextIndex + TOTAL_PLANS) % TOTAL_PLANS
    const nextPlan = floorPlans[wrapped]
    setCategoryId(nextPlan.category)
    setPlanId(nextPlan.id)
  }

  const goPrevPlan = () => goToPlanIndex(planIndex - 1)
  const goNextPlan = () => goToPlanIndex(planIndex + 1)

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  useEffect(() => {
    if (!lightboxOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.dispatchEvent(new CustomEvent('pause-scroll'))
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      if (skipResumeOnLightboxClose.current) {
        skipResumeOnLightboxClose.current = false
      } else {
        window.dispatchEvent(new CustomEvent('resume-scroll'))
        expandButtonRef.current?.focus()
      }
    }
  }, [lightboxOpen])

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') goToPlanIndex(planIndex - 1)
      if (event.key === 'ArrowRight') goToPlanIndex(planIndex + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, planIndex])

  const selectCategory = (nextCategoryId) => {
    const nextPlans = getPlansByCategory(nextCategoryId)
    setCategoryId(nextCategoryId)
    setPlanId(nextPlans[0]?.id || INITIAL_PLAN_ID)
  }

  const openLeadForPlan = () => {
    openLeadModal({
      source: 'floor-plans',
      floorPlanId: activePlan.id,
      floorPlanLabel: activePlan.label,
    })
  }

  const handleLeadFromDialog = () => {
    skipResumeOnLightboxClose.current = true
    setLightboxOpen(false)
    openLeadForPlan()
  }

  const retryImage = () => {
    setImageRetry((value) => value + 1)
  }

  return (
    <section id="tipologias" className="relative bg-transparent px-5 py-16 md:py-24">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-7 max-w-2xl md:mb-9">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-9 bg-orange" />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Plantas e tipologias</p>
          </div>
          <h2
            className="text-navy leading-[1.05]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 800 }}
          >
            Plantas que acompanham a vida da sua família.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/55">
            Conheça opções de 2 e 3 quartos, além de apartamentos Garden, com layouts pensados para aproveitar melhor
            cada ambiente.
          </p>
        </div>

        <div
          className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="group"
          aria-label="Categorias de plantas"
        >
          {floorPlanCategories.map((category) => {
            const active = category.id === categoryId
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectCategory(category.id)}
                className={`min-h-11 shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                  active
                    ? 'bg-navy text-white'
                    : 'bg-navy/[0.06] text-navy/70 hover:bg-navy/10 hover:text-navy'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Planta selecionada: {activePlan.label}
        </p>

        <div className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_24px_70px_rgba(20,53,81,0.1)] ring-1 ring-navy/8">
          <div className="grid lg:grid-cols-[1.45fr_0.9fr]">
            <div className="relative border-b border-navy/8 lg:border-b-0 lg:border-r">
              <div className="relative grid aspect-[5/4] place-items-center bg-[#f7f4ef] sm:aspect-[4/3] lg:aspect-[5/4] lg:min-h-[28rem]">
                {imageStatus === 'error' ? (
                  <div className="flex flex-col items-center gap-3 px-6 text-center">
                    <p className="text-sm text-ink/55">Não foi possível carregar esta planta.</p>
                    <button
                      type="button"
                      onClick={retryImage}
                      className="text-sm font-semibold text-orange underline-offset-4 hover:underline"
                    >
                      Tentar novamente
                    </button>
                  </div>
                ) : (
                  <img
                    key={`${activePlan.id}-${imageRetry}`}
                    ref={(node) => {
                      imageRef.current = node
                      if (node?.complete) {
                        queueMicrotask(() => resolveImageStatus(node))
                      }
                    }}
                    src={activePlan.imageUrl}
                    alt={activePlan.alt}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-contain p-1.5 sm:p-2 md:p-3"
                    onLoad={() => setImageStatus('loaded')}
                    onError={() => setImageStatus('error')}
                  />
                )}

                {imageStatus === 'loading' ? (
                  <div
                    className="pointer-events-none absolute inset-0 bg-[#f7f4ef]/55 motion-safe:animate-pulse"
                    aria-hidden="true"
                  />
                ) : null}

                <button
                  ref={expandButtonRef}
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 right-3 z-10 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-navy/88 px-3.5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange md:bottom-4 md:right-4"
                >
                  <Expand size={14} />
                  Ampliar
                </button>
              </div>

              <div
                className="flex gap-2 overflow-x-auto border-t border-navy/8 bg-cream/70 px-3 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-4"
                role="group"
                aria-label={`Plantas da categoria ${activePlan.categoryLabel}`}
              >
                {plansInCategory.map((plan) => {
                  const active = plan.id === planId
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setPlanId(plan.id)}
                      className={`min-h-10 shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange ${
                        active
                          ? 'bg-orange text-white'
                          : 'bg-white text-navy/65 ring-1 ring-navy/10 hover:text-navy'
                      }`}
                    >
                      {plan.shortLabel}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col justify-center gap-5 bg-cream/55 px-6 py-7 md:px-8 md:py-9">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
                  {activePlan.categoryLabel}
                </p>
                <h3
                  className="mt-2 text-navy leading-tight"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.45rem, 2.8vw, 1.9rem)', fontWeight: 800 }}
                >
                  {activePlan.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/58">
                  Ambientes bem distribuídos e espaços planejados para a rotina da família, com melhor aproveitamento de
                  cada ambiente.
                </p>
              </div>

              <div className="flex flex-wrap gap-x-5 gap-y-2 border-y border-navy/8 py-3.5">
                {highlights.map((item) => (
                  <span key={item} className="text-sm font-semibold tracking-wide text-navy/80">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={openLeadForPlan}
                  data-floor-plan-id={activePlan.id}
                  data-floor-plan-label={activePlan.label}
                  data-floor-plan-category={activePlan.category}
                  className="inline-flex w-full max-w-none cursor-pointer items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange md:max-w-[400px] md:justify-start md:px-6"
                >
                  Conhecer esta planta
                  <ArrowRight size={16} className="opacity-90" />
                </button>
                <p className="max-w-sm text-xs leading-relaxed text-ink/48">
                  Nossa equipe apresenta esta planta e combina o melhor momento para você conhecer o Oásis II.
                </p>
                <p className="max-w-sm text-[11px] leading-relaxed text-ink/32">
                  Imagem humanizada para fins ilustrativos. Consulte disponibilidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[110] flex flex-col bg-navy-dark/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="floor-plan-dialog-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox()
            }}
          >
            <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
              <div className="min-w-0">
                <h3
                  id="floor-plan-dialog-title"
                  className="truncate text-base font-semibold text-white md:text-lg"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Planta {activePlan.label}
                </h3>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {planIndex + 1} de {TOTAL_PLANS}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                aria-label="Fechar ampliação"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-2 md:px-20 md:pb-4"
              onTouchStart={(event) => {
                touchStartX.current = event.changedTouches[0]?.clientX ?? null
              }}
              onTouchEnd={(event) => {
                if (touchStartX.current === null) return
                const delta = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current
                touchStartX.current = null
                if (Math.abs(delta) < 48) return
                if (delta > 0) goPrevPlan()
                else goNextPlan()
              }}
            >
              <button
                type="button"
                onClick={goPrevPlan}
                className="absolute left-3 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange md:flex md:left-6"
                aria-label="Planta anterior"
              >
                <ChevronLeft size={22} />
              </button>

              <img
                key={`dialog-${activePlan.id}`}
                src={activePlan.imageUrl}
                alt={activePlan.alt}
                className="max-h-full max-w-full select-none object-contain"
                draggable={false}
              />

              <button
                type="button"
                onClick={goNextPlan}
                className="absolute right-3 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange md:flex md:right-6"
                aria-label="Próxima planta"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="border-t border-white/10 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 md:px-8 md:pb-6 md:pt-4">
              <div className="mx-auto mb-3 flex max-w-md items-center gap-3 md:hidden">
                <button
                  type="button"
                  onClick={goPrevPlan}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white active:bg-orange"
                  aria-label="Planta anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="min-w-0 flex-1 text-center">
                  <p className="truncate text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {activePlan.label}
                  </p>
                  <div className="mx-auto mt-2 h-1 max-w-[10rem] overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-orange transition-all duration-300"
                      style={{ width: `${((planIndex + 1) / TOTAL_PLANS) * 100}%` }}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={goNextPlan}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white active:bg-orange"
                  aria-label="Próxima planta"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleLeadFromDialog}
                className="mx-auto flex w-full max-w-md cursor-pointer items-center justify-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                Conhecer esta planta
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

export default FloorPlans
