import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { IconCheck } from '../../lib/icons.jsx'
import { openWhatsApp } from '../../lib/whatsapp.js'

function CompletePromptModal() {
  const [open, setOpen] = useState(false)
  const [lead, setLead] = useState(null)
  const [sendingWa, setSendingWa] = useState(false)

  useEffect(() => {
    const openHandler = (event) => {
      setLead(event.detail || null)
      setOpen(true)
    }
    window.addEventListener('open-lead-bridge', openHandler)
    return () => window.removeEventListener('open-lead-bridge', openHandler)
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
    setLead(null)
    window.dispatchEvent(new CustomEvent('close-lead'))
    window.dispatchEvent(new CustomEvent('resume-scroll'))
  }

  const handleComplete = () => {
    if (!lead) return
    setOpen(false)
    window.dispatchEvent(
      new CustomEvent('open-lead-steps', {
        detail: lead,
      }),
    )
    window.dispatchEvent(new CustomEvent('pause-scroll'))
  }

  const handleWhatsApp = async () => {
    setSendingWa(true)
    await openWhatsApp(lead?.email)
    setSendingWa(false)
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
            aria-labelledby="complete-prompt-title"
            className="relative my-auto w-full max-w-md overflow-hidden rounded-[2rem] bg-cream p-7 shadow-[0_35px_120px_rgba(4,20,34,0.42)] md:p-9"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy/[0.06] text-navy/55 transition-colors hover:bg-navy hover:text-white"
              aria-label="Fechar"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center gap-4 py-1 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white">
                <IconCheck size={25} />
              </div>
              <div className="pr-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">Quase lá</p>
                <h2
                  id="complete-prompt-title"
                  className="mt-2 text-navy leading-tight"
                  style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.55rem, 4.5vw, 2rem)', fontWeight: 800 }}
                >
                  Preencha o cadastro completo.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">
                  Recebemos seus dados. Em poucos passos personalizamos o atendimento sobre o Oásis II.
                </p>
              </div>

              <button
                type="button"
                onClick={handleComplete}
                className="mt-1 flex w-full cursor-pointer items-center justify-center rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Preencher cadastro completo
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={sendingWa}
                className="text-sm font-medium text-navy/45 underline-offset-4 transition-colors hover:text-navy hover:underline disabled:opacity-60"
              >
                {sendingWa ? 'Abrindo…' : 'Falar no WhatsApp'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CompletePromptModal
