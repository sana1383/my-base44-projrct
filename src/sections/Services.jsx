import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { sectionImages, services } from '../data/site.js'
import { imgUrl, imgSrcSet } from '../lib/images.js'
import { toFa } from '../lib/format.js'

const serviceIcons = ['building', 'compass', 'sparkle', 'users', 'area', 'home']

export default function Services() {
  return (
    <section className="section section--white" id="services" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <span className="eyebrow">خدمات</span>
              <h2 id="services-title">هر آنچه برای یک معاملهٔ مطمئن لازم است</h2>
            </div>
            <p className="section-head__aside">
              از نخستین بازدید تا تحویل کلید، همهٔ مراحل را با تیمی متخصص و ساختاری شفاف
              پیش می‌بریم.
            </p>
          </div>
        </Reveal>

        <Reveal className="services__list" delay={80}>
          {services.map((service, index) => (
            <article className="service-item" key={service.id}>
              <span className="service-item__num">{toFa(String(index + 1).padStart(2, '0'))}</span>
              <span className="service-item__icon" aria-hidden="true">
                <Icon name={serviceIcons[index % serviceIcons.length]} size={22} />
              </span>
              <h3 className="service-item__title">{service.title}</h3>
              <p className="service-item__text">{service.text}</p>
            </article>
          ))}
        </Reveal>

        <Reveal className="services__banner" delay={120}>
          <img
            src={imgUrl(sectionImages.services, 1600)}
            srcSet={imgSrcSet(sectionImages.services, [800, 1200, 1600])}
            sizes="100vw"
            alt="نمای بیرونی یک خانهٔ مدرن لوکس در نور روز"
            loading="lazy"
            decoding="async"
          />
          <div className="services__banner-content">
            <h3>مشاورهٔ اختصاصی، بی‌هزینه و بدون تعهد</h3>
            <p>
              یک گفت‌وگوی کوتاه کافی است تا بدانید چه گزینه‌هایی با هدف شما هم‌راستا است.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
