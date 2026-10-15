import { useEffect, useRef } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const DESKTOP = '(min-width: 861px)'

/**
 * Scroll parallax for one visual element.
 *
 * Writes `--p-y` (px) on the returned ref's element, based on how far it sits
 * from the centre of the viewport, so it drifts slower than the page while it
 * passes. Desktop only, and never under reduced-motion — there the offset is
 * parked at 0 and the element is completely still.
 */
export default function useParallaxScroll({ strength = 40, varName = '--p-y' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia(REDUCED_MOTION)
    const desktop = window.matchMedia(DESKTOP)
    let frame = 0

    const update = () => {
      frame = 0
      if (reduced.matches || !desktop.matches) {
        el.style.setProperty(varName, '0px')
        return
      }
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      // -1 (element at the bottom of the screen) … 1 (at the top)
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport
      const offset = Math.max(-1, Math.min(1, progress)) * strength
      el.style.setProperty(varName, `${offset.toFixed(2)}px`)
    }

    const request = () => { if (!frame) frame = requestAnimationFrame(update) }

    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    reduced.addEventListener('change', request)
    desktop.addEventListener('change', request)
    update()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      reduced.removeEventListener('change', request)
      desktop.removeEventListener('change', request)
    }
  }, [strength, varName])

  return ref
}
