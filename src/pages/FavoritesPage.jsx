import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { properties } from '../data/properties.js'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { faNumber } from '../lib/format.js'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const saved = properties.filter((property) => favorites.includes(property.id))

  return (
    <>
      <header className="page-hero">
        <div className="container page-hero__inner">
          <span className="eyebrow">فهرست شخصی</span>
          <h1>علاقه‌مندی‌های من</h1>
          <p>
            {saved.length
              ? `${faNumber(saved.length)} ملک را برای بررسی بعدی نشان کرده‌اید.`
              : 'هنوز ملکی را نشان نکرده‌اید. با زدن آیکون قلب روی هر کارت، آن را اینجا نگه دارید.'}
          </p>
        </div>
      </header>

      <section className="section section--ivory">
        <div className="container">
          {saved.length ? (
            <div className="results-grid">
              {saved.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state__icon fav-empty-icon">
                <Icon name="heart" size={34} />
              </span>
              <h3>فهرست شما خالی است</h3>
              <p>
                املاک مورد علاقهٔ خود را ذخیره کنید تا بعداً راحت‌تر مقایسه کنید و برای بازدید
                برنامه بریزید.
              </p>
              <div style={{ marginBlockStart: '1.4rem' }}>
                <Button to="/properties" variant="primary" icon="arrowLeft">
                  مشاهدهٔ املاک
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
