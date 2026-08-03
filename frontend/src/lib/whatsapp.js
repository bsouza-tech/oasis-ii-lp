import { apiUrl } from './api.js'

export const WHATSAPP_URL = 'https://link.genesisempreendimentos.com.br/site-vendas-oasis-ii-whatsapp'

export async function openWhatsApp(email) {
  try {
    if (email) {
      await fetch(apiUrl('/leads/whatsapp-clicked'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    }
  } catch {
    // keep UX even if tracking fails
  }

  window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')
}
