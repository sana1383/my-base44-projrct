import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import PropertyCard from './PropertyCard.jsx'

/**
 * Horizontal, snap-scrolling property carousel.
 * Supports mouse drag, touch swipe, arrow buttons and keyboard arrows.
 * RTL aware: scrollLeft runs negative, so directions are inverted.
 */
export default function PropertyCarousel({ properties, label = 'املاک' }) {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 })
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const isRtl = () => {
    const el = trackRef.current
    if (!el) return true
    return getComputedStyle(el).direction === 'rtl'
  }

  const updateEdges = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const offset = Math.abs(el.scrollLeft)
    setAtStart(offset < 4)
    setAtEnd(offset >= max - 4 || max <= 0)
  }, [])

  useEffect(() => {
    updateEdges()
    const el = trackRef.current
    if (!el) return undefined
    el.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      el.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [updateEdges, properties])

  // dir: 1 = advance through the list, -1 = go back
  const scrollByCards = (dir) => {
    const el = trackRef.current
    if (!el) return
    const step = Math.max(el.clientWidth * 0.8, 280)
    const amount = (isRtl() ? -1 : 1) * dir * step
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const onPointerDown = (event) => {
    const el = trackRef.current
    if (!el) return
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { active: true, startX: event.clientX, startScroll: el.scrollLeft, moved: 0 }
    el.classList.add('is-dragging')
  }

  const onPointerMove = (event) => {
    if (!drag.current.active) return
    const el = trackRef.current
    if (!el) return
    const delta = event.clientX - drag.current.startX
    drag.current.moved = Math.max(drag.current.moved, Math.abs(delta))
    el.scrollLeft = drag.current.startScroll - delta
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    const el = trackRef.current
    if (el) {
      el.classList.remove('is-dragging')
      const step = Math.max(el.clientWidth * 0.8, 280)
      const dir = isRtl() ? -1 : 1
      const index = Math.round(el.scrollLeft / (dir * step))
      el.scrollTo({ left: index * dir * step, behavior: 'smooth' })
    }
    updateEdges()
  }

  // Suppress link activation right after a real drag
  const onClickCapture = (event) => {
    if (drag.current.moved > 6) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCards(1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCards(-1)
    }
  }

  return (
    <div className="carousel-wrap">
      <div
        ref={trackRef}
        className="carousel"
        role="region"
        aria-label={`${label} — فهرست افقی`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {properties.map((property, index) => (
          <div className="carousel__item" key={property.id}>
            <PropertyCard property={property} eager={index < 2} />
          </div>
        ))}
      </div>

      <div className="container carousel__controls" style={{ marginBlockStart: '1.6rem' }}>
        <button
          type="button"
          className="icon-btn"
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          aria-label="املاک قبلی"
        >
          <Icon name="arrowRight" size={17} />
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          aria-label="املاک بعدی"
        >
          <Icon name="arrowLeft" size={17} />
        </button>
      </div>
    </div>
  )
}
