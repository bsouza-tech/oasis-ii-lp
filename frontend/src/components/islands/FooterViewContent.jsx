import { useEffect } from 'react'
import { trackMeta } from '../../lib/metaPixel.js'

function FooterViewContent() {
  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return

    let fired = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (fired) return
        if (!entries.some((entry) => entry.isIntersecting)) return
        fired = true
        trackMeta('ViewContent')
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  return null
}

export default FooterViewContent
