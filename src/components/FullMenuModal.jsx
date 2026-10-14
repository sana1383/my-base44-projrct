import { useState } from 'react'
import Modal from './Modal.jsx'
import ProductCard from './ProductCard.jsx'
import { menuItems, menuFilters } from '../data/menuItems.js'

export default function FullMenuModal({ open, onClose, onAdd }) {
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? menuItems : menuItems.filter((i) => i.category === filter)

  return (
    <Modal open={open} onClose={onClose} title="منوی کامل" wide>
      <div className="menu-filters" role="tablist" aria-label="فیلتر منو بر اساس دسته‌بندی">
        {menuFilters.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${filter === f.key ? ' filter-btn--active' : ''}`}
            onClick={() => setFilter(f.key)}
            role="tab"
            aria-selected={filter === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="menu-grid">
        {visible.map((item) => (
          <ProductCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </Modal>
  )
}
