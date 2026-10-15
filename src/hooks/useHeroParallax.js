import { useEffect, useRef, useState } from 'react'

const DESKTOP = '(min-width: 861px)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * Tracks whether the visitor asked for reduced motion.
 * Used to keep the hero video paused on the still poster instead of playing.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * Restrained layered parallax for the hero media.
 *
 * Writes three custom properties on the returned ref's element; CSS reads them
 * with a different factor per layer, which is what creates the depth:
 *   --par-x / --par-y  → the media layer (full strength)
 *
 * Only a mouse moves the hero, only from the desktop breakpoint up, and never
 * when reduced-motion is requested — phones, tablets and reduced-motion
 * visitors get a completely still hero. The offset is eased towards its target
 * with rAF and the loop stops once it settles.
 */
export default function useHeroParallax({ mouse = 16, scroll = 28 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const desktop = window.matchMedia(DESKTOP)
    const reduced = window.matchMedia(REDUCED_MOTION)

    let enabled = desktop.matches && !reduced.matches
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0

    const write = () => {
      el.style.setProperty('--par-x', `${currentX}px`)
      el.style.setProperty('--par-y', `${currentY}px`)
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      write()
      const settled = Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05
      if (settled) {
        currentX = targetX
        currentY = targetY
        write()
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const heroSection = el.closest('.hero')

    const onPointerMove = (e) => {
      // Touch and pen pointers stay perfectly still — only a real mouse moves the hero
      if (!enabled || (e.pointerType && e.pointerType !== 'mouse')) return
      // -1 … 1 from the hero's centre; a small offset keeps the movement subtle
      const rect = (heroSection || el).getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      targetX = Math.max(-1, Math.min(1, dx)) * mouse * -1
      targetY = Math.max(-1, Math.min(1, dy)) * mouse * -1
      start()
    }

    // Scroll drift is a separate layer: CSS applies it to the media only, so the
    // pointer offset (all layers) and the scroll offset (media only) never fight.
    const onScroll = () => {
      const offset = enabled ? Math.min(scroll, Math.max(0, window.scrollY * 0.08)) : 0
      el.style.setProperty('--par-scroll', `${offset}px`)
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    const onModeChange = () => {
      enabled = desktop.matches && !reduced.matches
      if (!enabled) {
        targetX = 0
        targetY = 0
        start()
      }
    }

    desktop.addEventListener('change', onModeChange)
    reduced.addEventListener('change', onModeChange)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    heroSection?.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      desktop.removeEventListener('change', onModeChange)
      reduced.removeEventListener('change', onModeChange)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      heroSection?.removeEventListener('pointerleave', onLeave)
    }
  }, [mouse, scroll])

  return ref
}
