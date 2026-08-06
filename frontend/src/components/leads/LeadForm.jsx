import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { apiUrl } from '../../lib/api.js'
import { checkEmailExists } from '../../lib/leads/check-email.js'
import { initialSchema } from '../../lib/leads/schema.js'
import { getLeadTracking } from '../../lib/leadTracking.js'
import { trackMeta } from '../../lib/metaPixel.js'
import { maskPhone } from '../../lib/phone.js'
import { FormField } from '../../lib/ui.jsx'

function LeadForm() {
  const [open, setOpen] = useState(false)
  const [floorPlanContext, setFloorPlanContext] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const openHandler = (event) => {
      setFloorPlanContext(
        event.detail?.floorPlanLabel
          ? {
              id: event.detail.floorPlanId,
              label: event.detail.floorPlanLabel,
            }
          : null,
      )
      setErrors({})
      setOpen(true)
    }
    window.addEventListener('open-lead', openHandler)
    return () => window.removeEventListener('open-lead', openHandler)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const handleClose = () => {
    setOpen(false)
    setFloorPlanContext(null)
    window.dispatchEvent(new CustomEvent('close-lead'))
    window.dispatchEvent(new CustomEvent('resume-scroll'))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors({})

    const parsed = initialSchema.safeParse({ name, email, phone })
    if (!parsed.success) {
      const next = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]
        if (key && !next[key]) next[key] = issue.message
      }
      setErrors(next)
      return
    }

    setLoading(true)
    const check = await checkEmailExists(parsed.data.email)

    if ('error' in check) {
      setErrors({ email: 'Erro ao verificar e-mail. Tente novamente.' })
      setLoading(false)
      return
    }

    if (check.exists) {
      setErrors({ email: 'Este e-mail já está cadastrado.' })
      setLoading(false)
      return
    }

    const tracking = getLeadTracking()
    const payload = {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      ...tracking,
    }

    try {
      const res = await fetch(apiUrl('/leads/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json()

      if (!result.success) {
        setErrors({ email: result.error || 'Erro ao enviar. Tente novamente.' })
        setLoading(false)
        return
      }

      trackMeta('Lead')
      setOpen(false)
      setFloorPlanContext(null)
      setName('')
      setEmail('')
      setPhone('')
      window.dispatchEvent(
        new CustomEvent('open-lead-bridge', {
          detail: payload,
        }),
      )
      window.dispatchEvent(new CustomEvent('pause-scroll'))
      setLoading(false)
    } catch {
      setErrors({ email: 'Erro ao enviar. Tente novamente.' })
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-navy/72 p-4 backdrop-blur-md md:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) handleClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-title"
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-cream shadow-[0_35px_120px_rgba(4,20,34,0.42)]"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy/[0.06] text-navy/55 transition-colors hover:bg-navy hover:text-white"
              aria-label="Fechar cadastro"
            >
              <X size={18} />
            </button>

            <form id="lead-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 p-7 pt-9 md:p-9 md:pt-10">
              <div className="pr-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">Agendar visita</p>
                <h2
                  id="lead-form-title"
                  className="mt-2 text-navy leading-tight"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.65rem, 5vw, 2.15rem)', fontWeight: 800 }}
                >
                  Solicite sua visita ao Oásis II.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/52">
                  {floorPlanContext?.label
                    ? `Nossa equipe entrará em contato para apresentar a planta ${floorPlanContext.label} e combinar o melhor dia e horário.`
                    : 'Preencha seus dados e nossa equipe entrará em contato para combinar o melhor dia e horário.'}
                </p>
              </div>

              <FormField label="Nome" placeholder="Seu nome" value={name} onChange={setName} error={errors.name} />
              <FormField
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={setEmail}
                error={errors.email}
              />
              <FormField
                label="Telefone"
                type="tel"
                placeholder="(21) 99999-9999"
                value={phone}
                onChange={(value) => setPhone(maskPhone(value))}
                error={errors.phone}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? <span className="spinner" /> : 'Continuar'}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-ink/40">
                Seus dados serão usados apenas para o contato sobre o Oásis II.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LeadForm
