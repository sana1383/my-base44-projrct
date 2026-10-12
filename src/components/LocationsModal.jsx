import Modal from './Modal.jsx'
import { locations } from '../data/locations.js'
import { PinIcon, ClockIcon, PhoneIcon } from './Icons.jsx'

export default function LocationsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Our Locations" wide>
      <p className="loc-sample-note">
        Sample location information — replace with your real addresses and hours.
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
              <PhoneIcon /> <span>{loc.phone}</span>
            </div>
            <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.82rem', color: 'var(--coffee-brown)', marginTop: '8px', display: 'inline-block' }}>
              View on Map →
            </a>
          </div>
        </div>
      ))}
    </Modal>
  )
}
