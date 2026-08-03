import { useState, useEffect, useRef } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

export function useCounter(target, duration = 1400, active = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    setVal(0)
    let start = null
    let id
    const step = (ts) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) { id = requestAnimationFrame(step) }
    }
    id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [active, target, duration])
  return val
}
