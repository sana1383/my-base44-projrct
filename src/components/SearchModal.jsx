import { useState, useEffect, useRef } from 'react'
import Modal from './Modal.jsx'
import { SearchIcon, PlusIcon } from './Icons.jsx'
import { menuItems } from '../data/menuItems.js'

export default function SearchModal({ open, onClose, onAdd }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const results = query.trim()
    ? menuItems.filter((i) => {
        const q = query.toLowerCase()
        return i.name.toLowerCase().includes(q) ||
               i.category.toLowerCase().includes(q) ||
               i.label.toLowerCase().includes(q) ||
               i.description.toLowerCase().includes(q)
      })
    : menuItems.slice(0, 6)

  return (
    <Modal open={open} onClose={onClose} title="جست‌وجو" wide>
      <div className="search-input-wrap">
        <SearchIcon className="search-icon" />
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="عبارت موردنظر را وارد کنید"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="جست‌وجو در منو"
        />
      </div>

      {results.length === 0 ? (
        <div className="search-empty">
          <p>نتیجه‌ای یافت نشد.</p>
        </div>
      ) : (
        <div className="search-results">
          {results.map((item) => (
            <div className="search-result" key={item.id}>
              <img className="search-result__img" src={item.image} alt={item.name} />
              <div style={{ flex: 1 }}>
                <div className="search-result__name">{item.name}</div>
                <div className="search-result__desc">
                  {item.description} — <bdi dir="ltr">${item.price.toFixed(2)}</bdi>
                </div>
              </div>
              <button className="add-btn" onClick={() => onAdd(item)} aria-label={`افزودن ${item.name} به سبد خرید`}>
                <PlusIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </Modal>
  )
}
