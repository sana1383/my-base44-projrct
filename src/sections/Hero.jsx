import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { heroStats, sectionImages } from '../data/site.js'
import { imgUrl, imgSrcSet } from '../lib/images.js'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <img
          src={imgUrl(sectionImages.hero, 1920)}
          srcSet={imgSrcSet(sectionImages.hero, [960, 1440, 1920, 2400])}
          sizes="100vw"
          alt="ویلای لوکس مدرن با دیوارهای شیشه‌ای و استخر بی‌نهایت در نور غروب"
          width="1920"
          height="1200"
          fetchpriority="high"
          decoding="async"
        />
      </div>
      <span className="hero__overlay" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow anim anim-1">
            <span className="hero__eyebrow-dot" aria-hidden="true" />
            املاک ممتاز · معماری · سرمایه‌گذاری
          </p>

          <h1 className="hero__title anim anim-2" id="hero-title">
            خانه‌ها و سرمایه‌گذاری‌های
            <br />
            استثنایی را کشف کنید
          </h1>

          <p className="hero__text anim anim-3">
            املاک ممتاز در بهترین موقعیت‌ها. خانهٔ رؤیایی یا سرمایه‌گذاری ایده‌آل خود را با
            اطمینان پیدا کنید.
          </p>

          <div className="hero__actions anim anim-4">
            <Button to="/properties" variant="champagne" size="lg" icon="arrowLeft">
              مشاهدهٔ املاک
            </Button>
            <Button
              to="/contact"
              variant="ghost-light"
              size="lg"
              icon="phone"
              iconPosition="start"
            >
              مشاورهٔ اختصاصی
            </Button>
          </div>

          <ul className="hero__stats anim anim-5">
            {heroStats.map((stat) => (
              <li className="hero__stat" key={stat.label}>
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
