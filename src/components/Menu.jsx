import { useState } from 'react'
import ProductCard from './ProductCard.jsx'
import { menuItems, menuFilters } from '../data/menuItems.js'
import { ArrowRight } from './Icons.jsx'

export default function Menu({ onAdd, onOpen }) {
  const [filter, setFilter] = useState('all')
  const featured = menuItems.filter((i) => i.featured)

  const visible = filter === 'all' ? featured : menuItems.filter((i) => i.category === filter)

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="menu-header">
          <div className="menu-header__left">
            <div className="eyebrow menu-header__label">Our Menu</div>
            <h2 className="menu-header__title">Seasonal favourites.</h2>
          </div>
          <div className="menu-header__right">
            <p className="menu-header__sub">
              Crafted with care, using the finest ingredients. From bold classics to unique seasonal
              creations, there's something for every coffee lover.
            </p>
            <button className="btn btn--ghost" onClick={() => onOpen('fullmenu')}>
              View Full Menu
              <ArrowRight className="arrow" width="16" height="16" />
            </button>
          </div>
        </div>

        <div className="menu-filters" role="tablist" aria-label="Filter menu by category">
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
      </div>
    </section>
  )
}
