import { useEffect, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'
import 'lenis/dist/lenis.css'

function LenisPause({ paused }) {
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
  }, [lenis, paused])
  return null
}

function LenisRoot() {
  const reduceMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const pause = () => setPaused(true)
    const resume = () => setPaused(false)
    window.addEventListener('open-lead', pause)
    window.addEventListener('open-lead-bridge', pause)
    window.addEventListener('open-lead-steps', pause)
    window.addEventListener('close-lead', resume)
    window.addEventListener('pause-scroll', pause)
    window.addEventListener('resume-scroll', resume)
    return () => {
      window.removeEventListener('open-lead', pause)
      window.removeEventListener('open-lead-bridge', pause)
      window.removeEventListener('open-lead-steps', pause)
      window.removeEventListener('close-lead', resume)
      window.removeEventListener('pause-scroll', pause)
      window.removeEventListener('resume-scroll', resume)
    }
  }, [])

  if (reduceMotion) return null
  return (
    <>
      <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true, anchors: true }} />
      <LenisPause paused={paused} />
    </>
  )
}

export default LenisRoot
