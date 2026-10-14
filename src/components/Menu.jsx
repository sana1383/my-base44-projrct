import { useState } from 'react'
import ProductCard from './ProductCard.jsx'
import { menuItems, menuFilters } from '../data/menuItems.js'
import { ArrowLeft } from './Icons.jsx'

export default function Menu({ onAdd, onOpen }) {
  const [filter, setFilter] = useState('all')
  const featured = menuItems.filter((i) => i.featured)

  const visible = filter === 'all' ? featured : menuItems.filter((i) => i.category === filter)

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="menu-header">
          <div className="menu-header__left">
            <div className="eyebrow menu-header__label">منوی ما</div>
            <h2 className="menu-header__title">طعم‌های محبوب فصل</h2>
          </div>
          <div className="menu-header__right">
            <p className="menu-header__sub">
              با دقت و از بهترین مواد اولیه تهیه شده‌اند. از قهوه‌های کلاسیک تا طعم‌های خاص فصلی،
              برای هر سلیقه‌ای انتخابی دل‌نشین داریم.
            </p>
            <button className="btn btn--ghost" onClick={() => onOpen('fullmenu')}>
              مشاهده منوی کامل
              <ArrowLeft className="arrow" width="16" height="16" />
            </button>
          </div>
        </div>

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
      </div>
    </section>
  )
}
