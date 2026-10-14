import { heroImage } from '../data/menuItems.js'
import { ArrowLeft, PlayIcon } from './Icons.jsx'

export default function Hero({ onNavigate, onOpen }) {
  return (
    <section className="hero" id="hero">
      <div className="hero__left">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">قهوه تخصصی، حال‌وهوایی گرم‌تر</p>
          <h1 className="hero__title">
            <span>بیشتر از</span>
            <span>یک فنجان</span>
            <span>قهوه</span>
          </h1>
          <p className="hero__sub">
            دانه‌های قهوه باکیفیت، طعم‌های فصلی و فضایی دنج برای لحظه‌ای آرامش.
          </p>
          <div className="hero__cta">
            <button className="btn btn--dark" onClick={() => onNavigate('menu')}>
              مشاهده منو
              <ArrowLeft className="arrow" width="16" height="16" />
            </button>
            <button className="btn btn--outline" onClick={() => onOpen('story')}>
              <PlayIcon width="16" height="16" />
              داستان ما را ببینید
            </button>
          </div>
        </div>
      </div>
      <div className="hero__right">
        <img
          className="hero__img"
          src={heroImage}
          alt="فضای دنج و آفتاب‌گرفته کافه HARTH COFFEE با بار چوبی و دستگاه اسپرسو"
          loading="eager"
          fetchpriority="high"
        />
        <span className="hero__overlay-text">قهوه خوب، فردایی روشن‌تر</span>
        <span className="hero__script">قهوه خوب<br />فردایی روشن‌تر</span>
      </div>
    </section>
  )
}
