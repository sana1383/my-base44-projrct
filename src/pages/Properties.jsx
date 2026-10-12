import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Button from '../components/Button.jsx'
import PageHero from '../components/PageHero.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import {
  priceBands,
  properties,
  propertyCities,
  propertyTypes,
  sortOptions,
} from '../data/properties.js'
import { sectionImages } from '../data/site.js'
import { faNumber } from '../lib/format.js'

const bedOptions = [
  { id: 'all', label: 'هر تعداد' },
  { id: '3', label: '۳+ خواب' },
  { id: '4', label: '۴+ خواب' },
  { id: '5', label: '۵+ خواب' },
]

const bathOptions = [
  { id: 'all', label: 'هر تعداد' },
  { id: '2', label: '۲+ حمام' },
  { id: '3', label: '۳+ حمام' },
  { id: '4', label: '۴+ حمام' },
]

export default function Properties() {
  const [params, setParams] = useSearchParams()

  const query = params.get('q') || ''
  const city = params.get('city') || 'all'
  const type = params.get('type') || 'all'
  const band = params.get('price') || 'all'
  const beds = params.get('beds') || 'all'
  const baths = params.get('baths') || 'all'
  const sort = params.get('sort') || 'featured'
  const onlyFeatured = params.get('featured') === '1'

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const activeBand = priceBands.find((item) => item.id === band) || priceBands[0]
    const needle = query.trim().toLowerCase()

    const filtered = properties.filter((property) => {
      if (onlyFeatured && !property.featured) return false
      if (city !== 'all' && property.city !== city) return false
      if (type !== 'all' && property.type !== type) return false
      if (beds !== 'all' && property.beds < Number(beds)) return false
      if (baths !== 'all' && property.baths < Number(baths)) return false
      if (property.price < activeBand.min || property.price >= activeBand.max) return false
      if (needle) {
        const haystack = [property.title, property.location, property.city, property.type, property.region]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(needle)) return false
      }
      return true
    })

    const sorted = [...filtered]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'area-desc':
        sorted.sort((a, b) => b.area - a.area)
        break
      case 'newest':
        sorted.sort((a, b) => b.year - a.year)
        break
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    }
    return sorted
  }, [query, city, type, band, beds, baths, sort, onlyFeatured])

  const hasFilters =
    Boolean(query) ||
    city !== 'all' ||
    type !== 'all' ||
    band !== 'all' ||
    beds !== 'all' ||
    baths !== 'all' ||
    onlyFeatured ||
    sort !== 'featured'

  const reset = () => setParams(new URLSearchParams(), { replace: true })

  return (
    <>
      <PageHero
        eyebrow="املاک"
        title="فهرست املاک افق"
        description="با جست‌وجو و فیلترهای دقیق، ملکی را پیدا کنید که با سبک زندگی و هدف سرمایه‌گذاری شما هم‌خوان باشد."
        image={sectionImages.propertiesHero}
        crumbs={[{ label: 'املاک' }]}
      />

      <section className="section section--ivory">
        <div className="container">
          <div className="filters" role="search">
            <div className="filters__row">
              <div className="field filters__search">
                <label className="field__label" htmlFor="f-q">
                  جست‌وجو
                </label>
                <div className="search-field">
                  <Icon name="search" size={17} />
                  <input
                    id="f-q"
                    className="input input--search"
                    type="search"
                    placeholder="نام ملک، محله یا شهر…"
                    value={query}
                    onChange={(event) => setParam('q', event.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="f-city">
                  موقعیت
                </label>
                <select
                  id="f-city"
                  className="select"
                  value={city}
                  onChange={(event) => setParam('city', event.target.value)}
                >
                  <option value="all">همهٔ موقعیت‌ها</option>
                  {propertyCities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="f-type">
                  نوع ملک
                </label>
                <select
                  id="f-type"
                  className="select"
                  value={type}
                  onChange={(event) => setParam('type', event.target.value)}
                >
                  <option value="all">همهٔ انواع</option>
                  {propertyTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filters__row">
              <div className="field">
                <label className="field__label" htmlFor="f-price">
                  محدودهٔ قیمت
                </label>
                <select
                  id="f-price"
                  className="select"
                  value={band}
                  onChange={(event) => setParam('price', event.target.value)}
                >
                  {priceBands.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="f-beds">
                  خواب
                </label>
                <select
                  id="f-beds"
                  className="select"
                  value={beds}
                  onChange={(event) => setParam('beds', event.target.value)}
                >
                  {bedOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="f-baths">
                  حمام
                </label>
                <select
                  id="f-baths"
                  className="select"
                  value={baths}
                  onChange={(event) => setParam('baths', event.target.value)}
                >
                  {bathOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field__label" htmlFor="f-sort">
                  مرتب‌سازی
                </label>
                <select
                  id="f-sort"
                  className="select"
                  value={sort}
                  onChange={(event) => setParam('sort', event.target.value)}
                >
                  {sortOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filters__foot">
              <div className="chip-row">
                <button
                  type="button"
                  className={`chip ${onlyFeatured ? 'is-active' : ''}`.trim()}
                  aria-pressed={onlyFeatured}
                  onClick={() => setParam('featured', onlyFeatured ? '' : '1')}
                >
                  <Icon name="star" size={13} /> فقط املاک ویژه
                </button>
              </div>

              <p className="filters__count" aria-live="polite">
                <strong>{faNumber(results.length)}</strong> ملک مطابق جست‌وجوی شما
                {hasFilters ? (
                  <button
                    type="button"
                    className="chip"
                    style={{ marginInlineStart: '0.7rem' }}
                    onClick={reset}
                  >
                    پاک کردن فیلترها
                  </button>
                ) : null}
              </p>
            </div>
          </div>

          <div style={{ marginBlockStart: 'clamp(28px, 4vw, 44px)' }}>
            {results.length ? (
              <div className="results-grid">
                {results.map((property, index) => (
                  <PropertyCard key={property.id} property={property} eager={index < 3} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span className="empty-state__icon">
                  <Icon name="search" size={34} />
                </span>
                <h3>ملکی با این مشخصات پیدا نشد</h3>
                <p>
                  فیلترها را کمی بازتر کنید یا با کارشناسان افق تماس بگیرید تا ملک‌های خارج از
                  فهرست عمومی را برایتان بررسی کنیم.
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.7rem',
                    justifyContent: 'center',
                    marginBlockStart: '1.4rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <Button variant="outline" onClick={reset}>
                    پاک کردن فیلترها
                  </Button>
                  <Button to="/contact" variant="primary" icon="arrowLeft">
                    تماس با مشاور
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
