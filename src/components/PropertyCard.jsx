import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import FavoriteButton from './FavoriteButton.jsx'
import { imgUrl, imgSrcSet } from '../lib/images.js'
import { faNumber, formatPrice } from '../lib/format.js'

/** Reusable property card used by the carousel, results grid and detail page. */
export default function PropertyCard({ property, compact = false, eager = false }) {
  const href = `/properties/${property.slug}`

  return (
    <article className={`pcard ${compact ? 'pcard--compact' : ''}`.trim()}>
      <div className="pcard__media">
        <Link to={href} tabIndex={-1} aria-hidden="true">
          <img
            src={imgUrl(property.images[0], 800)}
            srcSet={imgSrcSet(property.images[0], [400, 600, 800, 1100])}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            alt={`${property.title} — ${property.location}`}
            width="800"
            height="600"
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
        </Link>
        <span className="pcard__badge">{property.type}</span>
        <FavoriteButton id={property.id} title={property.title} />
        <span className="pcard__overlay" aria-hidden="true" />
      </div>

      <div className="pcard__body">
        <h3 className="pcard__title">
          <Link to={href}>{property.title}</Link>
        </h3>

        <p className="pcard__location">
          <Icon name="pin" size={14} />
          {property.location}
        </p>

        <div className="pcard__meta">
          <span className="pcard__meta-item">
            <Icon name="bed" size={15} />
            {faNumber(property.beds)} خواب
          </span>
          <span className="pcard__meta-item">
            <Icon name="bath" size={15} />
            {faNumber(property.baths)} حمام
          </span>
          <span className="pcard__meta-item">
            <Icon name="area" size={15} />
            {faNumber(property.area)} متر
          </span>
        </div>

        <div className="pcard__foot">
          <div className="pcard__price">
            {formatPrice(property.price)}
            <small>قیمت پیشنهادی</small>
          </div>
          <Link to={href} className="pcard__cta" aria-label={`مشاهدهٔ ${property.title}`}>
            مشاهده
            <Icon name="arrowLeft" size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
