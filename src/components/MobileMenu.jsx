import { useEffect, useRef } from 'react'
import { ArrowUpRight } from './Icons.jsx'

const links = [
  { label: 'Home', target: 'hero' },
  { label: 'Menu', target: 'menu' },
  { label: 'Our Story', target: 'story' },
  { label: 'Locations', target: 'locations' },
  { label: 'Shop', target: 'shop' },
]

export default function MobileMenu({ open, onClose, onNavigate, onOpen }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const handleNav = (target) => {
    onClose()
    onNavigate(target)
  }

  return (
    <>
      {open && <div className="overlay overlay--open" onClick={onClose} aria-hidden="true" />}
      <div
        className={`mobile-menu${open ? ' mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="mobile-menu__nav">
          {links.map((link) => (
            <button
              key={link.target}
              className="mobile-menu__link"
              onClick={() => handleNav(link.target)}
            >
              {link.label}
              <ArrowUpRight className="arrow" width="20" height="20" />
            </button>
          ))}
        </nav>
        <button
          ref={closeRef}
          className="btn btn--dark mobile-menu__cta"
          onClick={() => { onClose(); onOpen('reservation') }}
        >
          Reserve a Table
        </button>
      </div>
    </>
  )
}
