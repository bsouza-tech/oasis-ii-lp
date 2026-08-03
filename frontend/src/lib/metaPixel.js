export const META_PIXEL_ID = '1749280982701521'

export function trackMeta(event, params) {
  if (typeof window === 'undefined') return

  const fire = () => {
    if (typeof window.fbq !== 'function') return false
    if (params) window.fbq('track', event, params)
    else window.fbq('track', event)
    return true
  }

  if (fire()) return

  // Pixel ainda carregando — tenta de novo em breve
  window.setTimeout(() => {
    fire()
  }, 800)
}
