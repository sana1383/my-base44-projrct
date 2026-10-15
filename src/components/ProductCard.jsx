import { PlusIcon } from './Icons.jsx'
import useTilt from '../hooks/useTilt.js'

export default function ProductCard({ item, onAdd }) {
  const tiltRef = useTilt()

  return (
    <article className="product-card" ref={tiltRef}>
      <div className="product-card__img-wrap">
        <img
          className="product-card__img"
          src={item.image}
          alt={`${item.name} — ${item.description}`}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="product-card__body">
        <div className="product-card__label">{item.label}</div>
        <h3 className="product-card__name">{item.name}</h3>
        <p className="product-card__desc">{item.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">${item.price.toFixed(2)}</span>
          <button
            className="add-btn"
            onClick={() => onAdd(item)}
            aria-label={`افزودن ${item.name} به سبد خرید`}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  )
}
