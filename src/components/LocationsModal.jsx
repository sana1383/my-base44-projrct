import Modal from './Modal.jsx'
import { locations } from '../data/locations.js'
import { PinIcon, ClockIcon, PhoneIcon, ArrowLeft } from './Icons.jsx'

export default function LocationsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="شعب ما" wide>
      <p className="loc-sample-note">
        اطلاعات این بخش نمونه است — آن را با نشانی و ساعت کاری واقعی خود جایگزین کنید.
      </p>
      {locations.map((loc) => (
        <div className="loc-card" key={loc.id}>
          <img className="loc-card__img" src={loc.image} alt={loc.name} />
          <div style={{ flex: 1 }}>
            <h3 className="loc-card__name">{loc.name}</h3>
            <div className="loc-card__row">
              <PinIcon /> <span>{loc.address}</span>
            </div>
            <div className="loc-card__row">
              <ClockIcon /> <span>{loc.hours}</span>
            </div>
            <div className="loc-card__row">
              <PhoneIcon /> <bdi dir="ltr">{loc.phone}</bdi>
            </div>
            <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.82rem', color: 'var(--coffee-brown)', marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              مشاهده روی نقشه
              <ArrowLeft width="14" height="14" />
            </a>
          </div>
        </div>
      ))}
    </Modal>
  )
}
