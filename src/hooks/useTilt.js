import { useEffect, useRef } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/**
 * Subtle pointer tilt for cards.
 *
 * Writes `--tilt-x` / `--tilt-y` (degrees) on the returned ref's element and
 * toggles `is-tilting` while the pointer is moving, so CSS can follow the cursor
 * closely and then ease back on exit. Only a real mouse tilts: touch and pen
 * pointers are ignored, and reduced-motion visitors never see it at all.
 */
export default function useTilt({ max = 5 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia(REDUCED_MOTION)

    const set = (x, y) => {
      el.style.setProperty('--tilt-x', `${x.toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${y.toFixed(2)}deg`)
    }

    const reset = () => {
      el.classList.remove('is-tilting')
      set(0, 0)
    }

    const onPointerMove = (e) => {
      if (reduced.matches || (e.pointerType && e.pointerType !== 'mouse')) return
      const rect = el.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      // -0.5 … 0.5 from the centre of the card
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      el.classList.add('is-tilting')
      // the half under the pointer lifts towards the viewer
      set(py * max * 2, -px * max * 2)
    }

    el.addEventListener('pointermove', onPointerMove)
    el.addEventListener('pointerleave', reset)
    el.addEventListener('pointercancel', reset)

    return () => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', reset)
      el.removeEventListener('pointercancel', reset)
    }
  }, [max])

  return ref
}
