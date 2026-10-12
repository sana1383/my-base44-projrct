import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import Button from './Button.jsx'

/**
 * Accessible modal used for "تماس با مشاور" and "رزرو بازدید".
 * There is no backend in this project yet, so a valid submission is
 * acknowledged in-place; wire `onSubmit` to a real endpoint later.
 */
export default function InquiryModal({ open, onClose, mode = 'contact', property }) {
  const [values, setValues] = useState({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setSent(false)
    setErrors({})
    setValues({
      name: '',
      phone: '',
      email: '',
      message:
        mode === 'viewing' && property
          ? `برای بازدید از «${property.title}» درخواست وقت دارم.`
          : '',
    })
  }, [open, mode, property])

  useEffect(() => {
    if (!open) return undefined
    document.documentElement.classList.add('no-scroll')
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector('input')?.focus()
    }, 60)
    return () => {
      document.documentElement.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(timer)
    }
  }, [open, onClose])

  const set = (key) => (event) => setValues((v) => ({ ...v, [key]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = 'نام خود را وارد کنید.'
    if (!values.phone.trim()) next.phone = 'شمارهٔ تماس را وارد کنید.'
    else if (!/^[0-9+\-\s()۰-۹]{7,}$/.test(values.phone.trim()))
      next.phone = 'شمارهٔ تماس معتبر نیست.'
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'ایمیل معتبر نیست.'

    setErrors(next)
    if (Object.keys(next).length) return
    setSent(true)
  }

  const title = mode === 'viewing' ? 'رزرو بازدید' : 'تماس با مشاور'
  const desc =
    mode === 'viewing'
      ? property
        ? `زمان پیشنهادی خود را ثبت کنید؛ کارشناس افق برای هماهنگی بازدید «${property.title}» تماس می‌گیرد.`
        : 'زمان پیشنهادی خود را ثبت کنید تا برای هماهنگی بازدید تماس بگیریم.'
      : property
        ? `پرسش خود دربارهٔ «${property.title}» را بنویسید؛ مشاور اختصاصی این ملک پاسخ می‌دهد.`
        : 'پرسش یا درخواست خود را بنویسید؛ کارشناسان ما در نخستین فرصت پاسخ می‌دهند.'

  return (
    <div
      className={`modal ${open ? 'is-open' : ''}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="modal__panel" ref={panelRef}>
        <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="بستن">
          <Icon name="close" size={17} />
        </button>

        <h2 className="modal__title">{title}</h2>
        <p className="modal__desc">{desc}</p>

        {sent ? (
          <>
            <div className="alert alert--success" role="status">
              <Icon name="check" size={18} />
              <span>
                درخواست شما ثبت شد. کارشناسان افق در نخستین فرصت با شما تماس می‌گیرند.
              </span>
            </div>
            <Button variant="outline" className="btn--block" onClick={onClose} style={{ marginBlockStart: '1rem' }}>
              بستن
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-grid form-grid--2">
                <div className="field">
                  <label className="field__label" htmlFor="inq-name">
                    نام و نام خانوادگی
                  </label>
                  <input
                    id="inq-name"
                    className="input"
                    value={values.name}
                    onChange={set('name')}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name ? <span className="field__error">{errors.name}</span> : null}
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="inq-phone">
                    شمارهٔ تماس
                  </label>
                  <input
                    id="inq-phone"
                    className="input"
                    value={values.phone}
                    onChange={set('phone')}
                    inputMode="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone ? <span className="field__error">{errors.phone}</span> : null}
                </div>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="inq-email">
                  ایمیل <span className="text-muted">(اختیاری)</span>
                </label>
                <input
                  id="inq-email"
                  className="input"
                  value={values.email}
                  onChange={set('email')}
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <span className="field__error">{errors.email}</span> : null}
              </div>

              <div className="field">
                <label className="field__label" htmlFor="inq-message">
                  توضیحات
                </label>
                <textarea
                  id="inq-message"
                  className="textarea"
                  value={values.message}
                  onChange={set('message')}
                />
              </div>

              <Button variant="primary" type="submit" className="btn--block">
                {mode === 'viewing' ? 'ثبت درخواست بازدید' : 'ارسال درخواست'}
              </Button>
              <p className="form-note">
                اطلاعات شما فقط برای پیگیری همین درخواست استفاده می‌شود.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
