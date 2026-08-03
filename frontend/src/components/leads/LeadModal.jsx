import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { apiUrl } from '../../lib/api.js'
import { trackMeta } from '../../lib/metaPixel.js'
import StepBirthDate from './steps/StepBirthDate.jsx'
import StepCity from './steps/StepCity.jsx'
import StepInvestment from './steps/StepInvestment.jsx'
import StepProfile from './steps/StepProfile.jsx'
import StepRelationship from './steps/StepRelationship.jsx'
import ThanksModal from './ThanksModal.jsx'

const TOTAL_STEPS = 5

const emptyModal = {
  relationship_status: '',
  monthly_investment: '',
  current_city: '',
  birth_date: '',
  profile_type: '',
}

function LeadModal() {
  const [open, setOpen] = useState(false)
  const [thanksOpen, setThanksOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [initialData, setInitialData] = useState(null)
  const [modalData, setModalData] = useState(emptyModal)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const openHandler = (event) => {
      setInitialData(event.detail)
      setModalData(emptyModal)
      setStep(1)
      setSubmitError('')
      setThanksOpen(false)
      setOpen(true)
    }
    window.addEventListener('open-lead-steps', openHandler)
    return () => window.removeEventListener('open-lead-steps', openHandler)
  }, [])

  useEffect(() => {
    if (!open && !thanksOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open, thanksOpen])

  const canContinue = () => {
    if (step === 1) return Boolean(modalData.relationship_status)
    if (step === 2) return Boolean(modalData.monthly_investment)
    if (step === 3) return modalData.current_city.trim().length >= 2
    if (step === 4) return true
    if (step === 5) return Boolean(modalData.profile_type)
    return false
  }

  const handleFinalize = async () => {
    if (!initialData || !canContinue()) return
    setSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch(apiUrl('/leads/complete'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: initialData.email,
          ...modalData,
          birth_date: modalData.birth_date || '',
        }),
      })
      const result = await res.json()

      if (!result.success) {
        setSubmitError(result.error || 'Erro ao enviar. Tente novamente.')
        setSubmitting(false)
        return
      }

      trackMeta('CompleteRegistration')
      setOpen(false)
      setThanksOpen(true)
      setSubmitting(false)
    } catch {
      setSubmitError('Erro ao enviar. Tente novamente.')
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    if (!canContinue()) return
    if (step < TOTAL_STEPS) {
      setStep((current) => current + 1)
      return
    }
    handleFinalize()
  }

  const closeThanks = () => {
    setThanksOpen(false)
    setInitialData(null)
    setModalData(emptyModal)
    setStep(1)
    window.dispatchEvent(new CustomEvent('resume-scroll'))
    window.dispatchEvent(new CustomEvent('close-lead'))
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-navy/72 p-4 backdrop-blur-md md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-steps-title"
              className="relative my-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-cream shadow-[0_35px_120px_rgba(4,20,34,0.42)]"
            >
              <div className="border-b border-navy/8 px-7 py-4 md:px-9">
                <p id="lead-steps-title" className="text-xs font-semibold uppercase tracking-[0.18em] text-navy/45">
                  Etapa {step} de {TOTAL_STEPS}
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-navy/10">
                  <div
                    className="h-full rounded-full bg-orange transition-all duration-300"
                    style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-7 md:p-9">
                {step === 1 && (
                  <StepRelationship
                    value={modalData.relationship_status}
                    onChange={(value) => setModalData((prev) => ({ ...prev, relationship_status: value }))}
                  />
                )}
                {step === 2 && (
                  <StepInvestment
                    value={modalData.monthly_investment}
                    onChange={(value) => setModalData((prev) => ({ ...prev, monthly_investment: value }))}
                  />
                )}
                {step === 3 && (
                  <StepCity
                    value={modalData.current_city}
                    onChange={(value) => setModalData((prev) => ({ ...prev, current_city: value }))}
                  />
                )}
                {step === 4 && (
                  <StepBirthDate
                    value={modalData.birth_date}
                    onChange={(value) => setModalData((prev) => ({ ...prev, birth_date: value }))}
                  />
                )}
                {step === 5 && (
                  <StepProfile
                    value={modalData.profile_type}
                    onChange={(value) => setModalData((prev) => ({ ...prev, profile_type: value }))}
                  />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canContinue() || submitting}
                  className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {submitting ? <span className="spinner" /> : step === TOTAL_STEPS ? 'Finalizar' : 'Confirmar'}
                </button>
                {submitError ? <p className="mt-3 text-center text-xs text-red-500">{submitError}</p> : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ThanksModal open={thanksOpen} email={initialData?.email} onClose={closeThanks} />
    </>
  )
}

export default LeadModal
