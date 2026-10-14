import { useState } from 'react'
import Modal from './Modal.jsx'
import { locations } from '../data/locations.js'

const emptyForm = { name: '', email: '', phone: '', branch: locations[0].id, date: '', time: '', guests: '2', notes: '' }

export default function ReservationModal({ open, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'لطفاً این فیلد را تکمیل کنید.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'لطفاً یک آدرس ایمیل معتبر وارد کنید.'
    if (!form.date) e.date = 'لطفاً این فیلد را تکمیل کنید.'
    if (!form.time) e.time = 'لطفاً این فیلد را تکمیل کنید.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // Frontend demonstration — no reservation backend configured.
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setForm(emptyForm)
    setErrors({})
    onClose()
  }

  const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: null })) }

  return (
    <Modal open={open} onClose={handleClose} title="رزرو میز">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '32px 20px' }}>
          <div className="form-msg form-msg--ok" style={{ marginBottom: 24 }}>
            {form.name.trim().split(' ')[0]} عزیز، درخواست شما با موفقیت ثبت شد.
          </div>
          <p style={{ fontSize: '0.88rem', opacity: 0.7, marginBottom: 24, lineHeight: 1.9 }}>
            این یک نمونهٔ نمایشی است؛ رزرو شما فقط یک «درخواست» است و تا زمانی که موجودی را
            بررسی نکنیم و با شما تماس بگیریم، قطعی نمی‌شود. به‌زودی با شما در{' '}
            <bdi dir="ltr">{form.email}</bdi> تماس می‌گیریم.
          </p>
          <button className="btn btn--dark" onClick={handleClose}>بستن</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="r-name">نام و نام خانوادگی</label>
              <input id="r-name" className="form-input" type="text" value={form.name}
                onChange={(e) => set('name', e.target.value)} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-email">ایمیل</label>
              <input id="r-email" className="form-input" type="email" dir="ltr" value={form.email}
                onChange={(e) => set('email', e.target.value)} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-phone">شماره تماس (اختیاری)</label>
              <input id="r-phone" className="form-input" type="tel" dir="ltr" value={form.phone}
                onChange={(e) => set('phone', e.target.value)} />
            </div>
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="r-branch">انتخاب شعبه</label>
              <select id="r-branch" className="form-select" value={form.branch}
                onChange={(e) => set('branch', e.target.value)}>
                {locations.map((loc) => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-date">تاریخ</label>
              <input id="r-date" className="form-input" type="date" value={form.date}
                onChange={(e) => set('date', e.target.value)} />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-time">ساعت</label>
              <input id="r-time" className="form-input" type="time" value={form.time}
                onChange={(e) => set('time', e.target.value)} />
              {errors.time && <span className="form-error">{errors.time}</span>}
            </div>
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="r-guests">تعداد نفرات</label>
              <select id="r-guests" className="form-select" value={form.guests}
                onChange={(e) => set('guests', e.target.value)}>
                {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} نفر</option>)}
                <option value="9+">بیش از ۹ نفر (لطفاً توضیح دهید)</option>
              </select>
            </div>
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="r-notes">توضیحات بیشتر (اختیاری)</label>
              <textarea id="r-notes" className="form-textarea" value={form.notes}
                onChange={(e) => set('notes', e.target.value)} placeholder="درخواست‌های خاص، ترجیح صندلی…" />
            </div>
          </div>
          <button type="submit" className="btn btn--dark" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>
            ثبت درخواست رزرو
          </button>
          <p style={{ fontSize: '0.75rem', opacity: 0.55, textAlign: 'center', marginTop: 12, lineHeight: 1.8 }}>
            این فرم نمایشی است و رزرو قطعی محسوب نمی‌شود؛ پس از بررسی موجودی با شما تماس می‌گیریم.
          </p>
        </form>
      )}
    </Modal>
  )
}
