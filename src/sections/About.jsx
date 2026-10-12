import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { aboutPoints, sectionImages } from '../data/site.js'
import { imgUrl, imgSrcSet } from '../lib/images.js'

export default function About() {
  return (
    <section className="section section--white" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__text">
          <span className="eyebrow">درباره ما</span>
          <h2 id="about-title">ما که هستیم</h2>
          <p className="about__body">
            در املاک افق، مردم را به خانه‌های استثنایی و سرمایه‌گذاری‌های هوشمند وصل می‌کنیم.
            درستکاری، شفافیت و رضایت مشتری، قلب همهٔ کار ما است.
          </p>

          <ul className="about__points">
            {aboutPoints.map((point) => (
              <li className="about__point" key={point}>
                <Icon name="check" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <Button to="/about" variant="outline" icon="arrowLeft">
            بیشتر بدانید
          </Button>
        </Reveal>

        <Reveal className="about__media" delay={120}>
          <div className="about__media-main">
            <img
              src={imgUrl(sectionImages.aboutMain, 900)}
              srcSet={imgSrcSet(sectionImages.aboutMain, [480, 700, 900, 1200])}
              sizes="(max-width: 899px) 90vw, 30vw"
              alt="خانهٔ لوکس مدرن با استخر و محوطهٔ سبز"
              width="900"
              height="1125"
              loading="lazy"
              decoding="async"
            />
            <span className="about__badge">
              <strong>۱۸ سال</strong>
              تجربهٔ املاک ممتاز
            </span>
          </div>

          <div className="about__media-side">
            <img
              src={imgUrl(sectionImages.aboutSide, 600)}
              srcSet={imgSrcSet(sectionImages.aboutSide, [360, 480, 600, 800])}
              sizes="(max-width: 899px) 45vw, 18vw"
              alt="نمای عمودی از نور طبیعی و معماری داخلی خانه"
              width="600"
              height="800"
              loading="lazy"
              decoding="async"
            />
          </div>

          <Link to="/properties" className="about__arrow" aria-label="مشاهدهٔ همهٔ املاک">
            <Icon name="arrowLeft" size={20} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
