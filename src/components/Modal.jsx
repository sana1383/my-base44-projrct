import { useEffect, useRef } from 'react'

// Reusable modal wrapper: handles Escape, backdrop click, body scroll lock, focus
export default function Modal({ open, onClose, title, children, wide = false, closeLabel = 'Close' }) {
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

  if (!open) return null

  return (
    <>
      <div className="overlay overlay--open" onClick={onClose} aria-hidden="true" />
      <div
        className={`modal modal--open${wide ? ' modal--wide' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button ref={closeRef} className="modal__close" onClick={onClose} aria-label={closeLabel}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </>
  )
}
