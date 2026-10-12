import Reveal from '../components/Reveal.jsx'
import PropertyCarousel from '../components/PropertyCarousel.jsx'
import { properties } from '../data/properties.js'

export default function FeaturedProperties() {
  const featured = properties.filter((property) => property.featured)
  const list = featured.length >= 6 ? featured : properties

  return (
    <section className="section section--ivory" id="featured" aria-labelledby="featured-title">
      <div className="container featured__head">
        <Reveal>
          <div className="section-head section-head--center">
            <div className="section-head__text">
              <span className="eyebrow eyebrow--plain" style={{ letterSpacing: 0 }}>
                ویژه
              </span>
              <h2 id="featured-title">املاک ویژه</h2>
            </div>
            <p className="section-head__aside">
              گزیده‌ای از خانه‌هایی که این هفته بیشترین توجه مشتریان افق را به خود جلب کرده‌اند.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <PropertyCarousel properties={list} label="املاک ویژه" />
      </Reveal>
    </section>
  )
}
