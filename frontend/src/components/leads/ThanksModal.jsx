import { useState } from 'react'
import { X } from 'lucide-react'
import { IconCheck } from '../../lib/icons.jsx'
import { openWhatsApp } from '../../lib/whatsapp.js'

function ThanksModal({ open, email, onClose }) {
  const [sending, setSending] = useState(false)

  if (!open) return null

  const handleWhatsApp = async () => {
    setSending(true)
    await openWhatsApp(email)
    setSending(false)
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-navy/72 p-4 backdrop-blur-md md:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="thanks-modal-title"
        className="relative my-auto w-full max-w-md overflow-hidden rounded-[2rem] bg-cream p-7 shadow-[0_35px_120px_rgba(4,20,34,0.42)] md:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-navy/[0.06] text-navy/55 transition-colors hover:bg-navy hover:text-white"
          aria-label="Fechar"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white">
            <IconCheck size={25} />
          </div>
          <h3
            id="thanks-modal-title"
            className="text-2xl font-bold text-navy"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Cadastro completo!
          </h3>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Obrigado. Em breve nossa equipe entrará em contato sobre o Oásis II.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 flex w-full cursor-pointer items-center justify-center rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Fechar
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={sending}
            className="text-sm font-medium text-navy/45 underline-offset-4 transition-colors hover:text-navy hover:underline disabled:opacity-60"
          >
            {sending ? 'Abrindo…' : 'Falar no WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ThanksModal
