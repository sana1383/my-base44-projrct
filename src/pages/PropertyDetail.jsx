import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import Reveal from '../components/Reveal.jsx'
import FavoriteButton from '../components/FavoriteButton.jsx'
import PropertyGallery from '../components/PropertyGallery.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import InquiryModal from '../components/InquiryModal.jsx'
import { getAgent, getPropertyBySlug, getSimilarProperties } from '../data/properties.js'
import { faNumber, formatArea, formatPrice } from '../lib/format.js'

export default function PropertyDetail() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)
  const [modal, setModal] = useState(null)

  if (!property) {
    return (
      <section className="notfound">
        <div className="container">
          <p className="notfound__code">۴۰۴</p>
          <h1>این ملک پیدا نشد</h1>
          <p className="lead" style={{ marginBlock: '0.6rem 1.6rem' }}>
            ممکن است این ملک فروخته شده یا نشانی آن تغییر کرده باشد.
          </p>
          <Button to="/properties" variant="primary" icon="arrowLeft">
            بازگشت به فهرست املاک
          </Button>
        </div>
      </section>
    )
  }

  const agent = getAgent(property.agentId)
  const similar = getSimilarProperties(property)

  const specs = [
    { icon: 'bed', value: `${faNumber(property.beds)}`, label: 'اتاق خواب' },
    { icon: 'bath', value: `${faNumber(property.baths)}`, label: 'حمام' },
    { icon: 'area', value: `${faNumber(property.area)}`, label: 'متر مربع' },
    { icon: 'building', value: `${faNumber(property.parking)}`, label: 'پارکینگ' },
  ]

  return (
    <>
      <section className="section" style={{ paddingBlockStart: 'calc(var(--header-h) + 28px)' }}>
        <div className="container">
          <nav className="crumbs" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
            <Link to="/properties">املاک</Link>
            <span className="crumbs__sep" aria-hidden="true">
              /
            </span>
            <span>{property.title}</span>
          </nav>
        </div>
      </section>

      <section className="detail" style={{ paddingBlockStart: 0 }}>
        <div className="container detail__grid">
          <div>
            <Reveal>
              <PropertyGallery images={property.images} title={property.title} />
            </Reveal>

            <div className="detail__head">
              <div>
                <span className="eyebrow">{property.type}</span>
                <h1 className="detail__title">{property.title}</h1>
                <p className="detail__location">
                  <Icon name="pin" size={15} />
                  {property.location}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                <div className="detail__price">
                  <div className="detail__price-value">{formatPrice(property.price)}</div>
                  <div className="detail__price-label">قیمت پیشنهادی</div>
                </div>
                <div style={{ position: 'relative' }}>
                  <FavoriteButton
                    id={property.id}
                    title={property.title}
                    className="fav-btn--inline"
                  />
                </div>
              </div>
            </div>

            <div className="spec-grid">
              {specs.map((spec) => (
                <div className="spec" key={spec.label}>
                  <span className="spec__icon">
                    <Icon name={spec.icon} size={19} />
                  </span>
                  <div className="spec__value">{spec.value}</div>
                  <div className="spec__label">{spec.label}</div>
                </div>
              ))}
            </div>

            <Reveal className="detail__block">
              <h2>دربارهٔ این ملک</h2>
              <p>{property.description}</p>
            </Reveal>

            <Reveal className="detail__block">
              <h2>ویژگی‌های کلیدی</h2>
              <ul className="detail__list">
                {property.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="detail__block">
              <h2>امکانات</h2>
              <ul className="detail__list">
                {property.amenities.map((amenity) => (
                  <li key={amenity}>
                    <Icon name="sparkle" size={16} />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="detail__aside" aria-label="اطلاعات تماس و بازدید">
            <div className="agent-card">
              <div className="agent-card__head">
                <img
                  className="agent-card__avatar"
                  src={`${agent.avatar}?auto=format&fit=facearea&facepad=2.6&w=140&h=140&q=80`}
                  alt={agent.name}
                  width="58"
                  height="58"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <div className="agent-card__name">{agent.name}</div>
                  <div className="agent-card__role">{agent.role}</div>
                </div>
              </div>

              <div className="agent-card__contact">
                <a href={`tel:${agent.phoneHref}`}>
                  <Icon name="phone" size={16} />
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`}>
                  <Icon name="mail" size={16} />
                  {agent.email}
                </a>
                <span>
                  <Icon name="clock" size={16} />
                  پاسخ‌گویی در ساعات کاری
                </span>
              </div>

              <div className="agent-card__actions">
                <Button
                  variant="primary"
                  icon="phone"
                  iconPosition="start"
                  className="btn--block"
                  onClick={() => setModal('contact')}
                >
                  تماس با مشاور
                </Button>
                <Button
                  variant="outline"
                  icon="calendar"
                  iconPosition="start"
                  className="btn--block"
                  onClick={() => setModal('viewing')}
                >
                  رزرو بازدید
                </Button>
              </div>
            </div>

            <div className="aside-note">
              <strong>چرا با افق؟</strong>
              بازدید هماهنگ در زمان دلخواه شما، گزارش کارشناسی مستند و همراهی حقوقی تا امضای
              سند — بدون هزینهٔ پنهان.
            </div>
          </aside>
        </div>
      </section>

      {similar.length ? (
        <section className="section section--ivory">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <div className="section-head__text">
                  <span className="eyebrow">پیشنهاد ما</span>
                  <h2>املاک مشابه</h2>
                </div>
                <Button to="/properties" variant="outline" icon="arrowLeft">
                  همهٔ املاک
                </Button>
              </div>
            </Reveal>

            <Reveal className="results-grid" delay={80} style={{ marginBlockStart: '2.2rem' }}>
              {similar.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      <div className="mobile-cta">
        <div className="mobile-cta__price">
          {formatPrice(property.price)}
          <small>{property.type}</small>
        </div>
        <Button
          variant="outline"
          icon="calendar"
          iconPosition="start"
          size="sm"
          onClick={() => setModal('viewing')}
        >
          بازدید
        </Button>
        <Button
          variant="primary"
          icon="phone"
          iconPosition="start"
          size="sm"
          onClick={() => setModal('contact')}
        >
          تماس
        </Button>
      </div>

      <InquiryModal
        open={Boolean(modal)}
        mode={modal || 'contact'}
        property={property}
        onClose={() => setModal(null)}
      />
    </>
  )
}
