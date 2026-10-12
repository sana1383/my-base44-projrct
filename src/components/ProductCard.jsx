import { PlusIcon } from './Icons.jsx'

export default function ProductCard({ item, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-card__img-wrap">
        <img
          className="product-card__img"
          src={item.image}
          alt={`${item.name} — ${item.description}`}
          loading="lazy"
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
            aria-label={`Add ${item.name} to cart`}
          >
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  )
}
