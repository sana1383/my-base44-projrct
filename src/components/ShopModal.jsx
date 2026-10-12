import Modal from './Modal.jsx'

const categories = ['Coffee Beans', 'Brewing Equipment', 'Merchandise', 'Gift Cards']

export default function ShopModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Shop">
      <div className="shop-coming">
        <h3>Coming Soon</h3>
        <p>
          We're carefully curating a collection of single-origin beans, brewing tools,
          and Harth Coffee merchandise. Sign up for our newsletter below to be the first
          to know when our shop opens.
        </p>
        <div className="shop-categories">
          {categories.map((c) => (
            <span className="shop-cat" key={c}>{c}</span>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', opacity: 0.5, fontStyle: 'italic' }}>
          No checkout or payment processing is available yet.
        </p>
      </div>
    </Modal>
  )
}
