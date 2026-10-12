import { useState } from 'react'
import Modal from './Modal.jsx'

export default function ReservationModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.date) e.date = 'Please select a date.'
    if (!form.time) e.time = 'Please select a time.'
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
    setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' })
    setErrors({})
    onClose()
  }

  const set = (k, v) => { setForm((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: null })) }

  return (
    <Modal open={open} onClose={handleClose} title="Reserve a Table">
      {submitted ? (
        <div style={{ textAlign: 'center', padding: '32px 20px' }}>
          <div className="form-msg form-msg--ok" style={{ marginBottom: 24 }}>
            Thank you, {form.name.split(' ')[0]}! Your reservation request has been received.
          </div>
          <p style={{ fontSize: '0.88rem', opacity: 0.65, marginBottom: 24, lineHeight: 1.6 }}>
            This is a demonstration — no booking is confirmed until we verify availability and contact you.
            We'll reach out at {form.email} shortly.
          </p>
          <button className="btn btn--dark" onClick={handleClose}>Close</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="r-name">Full Name</label>
              <input id="r-name" className="form-input" type="text" value={form.name}
                onChange={(e) => set('name', e.target.value)} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-email">Email</label>
              <input id="r-email" className="form-input" type="email" value={form.email}
                onChange={(e) => set('email', e.target.value)} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-phone">Phone (optional)</label>
              <input id="r-phone" className="form-input" type="tel" value={form.phone}
                onChange={(e) => set('phone', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-date">Date</label>
              <input id="r-date" className="form-input" type="date" value={form.date}
                onChange={(e) => set('date', e.target.value)} />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="r-time">Time</label>
              <input id="r-time" className="form-input" type="time" value={form.time}
                onChange={(e) => set('time', e.target.value)} />
              {errors.time && <span className="form-error">{errors.time}</span>}
            </div>
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="r-guests">Number of Guests</label>
              <select id="r-guests" className="form-select" value={form.guests}
                onChange={(e) => set('guests', e.target.value)}>
                {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
                <option value="9+">9+ guests (please note)</option>
              </select>
            </div>
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="r-notes">Notes (optional)</label>
              <textarea id="r-notes" className="form-textarea" value={form.notes}
                onChange={(e) => set('notes', e.target.value)} placeholder="Special requests, seating preferences..." />
            </div>
          </div>
          <button type="submit" className="btn btn--dark" style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>
            Request Reservation
          </button>
          <p style={{ fontSize: '0.72rem', opacity: 0.5, textAlign: 'center', marginTop: 12, lineHeight: 1.4 }}>
            This is a demonstration form. No booking is confirmed until availability is verified.
          </p>
        </form>
      )}
    </Modal>
  )
}
