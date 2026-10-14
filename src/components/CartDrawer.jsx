import { useEffect, useRef } from 'react'
import { MinusIcon, PlusIcon, CartIcon } from './Icons.jsx'

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
        aria-label="سبد خرید"
      >
        <div className="drawer__header">
          <h2 className="drawer__title">سبد خرید</h2>
          <button ref={closeRef} className="modal__close" onClick={onClose} aria-label="بستن سبد خرید">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="drawer__body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <CartIcon />
              <p>سبد خرید شما خالی است</p>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img className="cart-item__img" src={item.image} alt={item.name} />
                <div className="cart-item__info">
                  <div className="cart-item__name">{item.name}</div>
                  <div className="cart-item__price">${item.price.toFixed(2)}</div>
                  <div className="cart-item__qty" role="group" aria-label="تعداد">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)} aria-label={`کاهش تعداد ${item.name}`}>
                      <MinusIcon width="14" height="14" />
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)} aria-label={`افزایش تعداد ${item.name}`}>
                      <PlusIcon width="14" height="14" />
                    </button>
                  </div>
                  <button className="cart-item__remove" onClick={() => onRemove(item.id)}>
                    حذف
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer__footer">
            <div className="cart-subtotal">
              <span className="cart-subtotal__label">جمع جزء</span>
              <span className="cart-subtotal__amount">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-total">
              <span className="cart-total__label">مجموع کل</span>
              <span className="cart-total__amount">${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn btn--dark" style={{ width: '100%', justifyContent: 'center' }}>
              ادامه فرایند خرید
            </button>
            <button className="cart-continue" onClick={onClose}>
              ادامه خرید
            </button>
            <p className="cart-note">
              این یک نمونهٔ نمایشی سفارش است؛ هیچ پرداختی انجام نمی‌شود و سفارشی به آشپزخانه ارسال نمی‌گردد.
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
