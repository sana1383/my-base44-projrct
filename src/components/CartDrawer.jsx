import { useEffect, useRef } from 'react'
import { MinusIcon, PlusIcon, TrashIcon, CartIcon } from './Icons.jsx'

export default function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove }) {
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

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <>
      {open && <div className="overlay overlay--open" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`drawer${open ? ' drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
      >
        <div className="drawer__header">
          <h2 className="drawer__title">Your Order</h2>
          <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="drawer__body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <CartIcon />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img className="cart-item__img" src={item.image} alt={item.name} />
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.name}</div>
                  <div className="cart-item__price">${item.price.toFixed(2)}</div>
                  <div className="cart-item__qty">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>
                      <MinusIcon width="14" height="14" />
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>
                      <PlusIcon width="14" height="14" />
                    </button>
                  </div>
                  <button className="cart-item__remove" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer__footer">
            <div className="cart-subtotal">
              <span className="cart-subtotal__label">Subtotal</span>
              <span className="cart-subtotal__amount">${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn btn--dark" style={{ width: '100%', justifyContent: 'center' }}>
              Checkout
            </button>
            <p className="cart-note">
              Frontend ordering demonstration. No payment is processed and no order is sent to the kitchen.
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
