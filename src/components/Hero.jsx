import { heroImage } from '../data/menuItems.js'
import { ArrowRight, PlayIcon } from './Icons.jsx'

export default function Hero({ onNavigate, onOpen }) {
  return (
    <section className="hero" id="hero">
      <div className="hero__left">
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">Specialty Coffee · A Warmer Today</p>
          <h1 className="hero__title">
            <span>More</span>
            <span>than just</span>
            <span>coffee.</span>
          </h1>
          <p className="hero__sub">
            Thoughtfully sourced beans, seasonal flavours and a cozy space to slow down.
          </p>
          <div className="hero__cta">
            <button className="btn btn--dark" onClick={() => onNavigate('menu')}>
              Explore Our Menu
              <ArrowRight className="arrow" width="16" height="16" />
            </button>
            <button className="btn btn--outline" onClick={() => onOpen('story')}>
              <PlayIcon width="16" height="16" />
              Watch Our Story
            </button>
          </div>
        </div>
      </div>
      <div className="hero__right">
        <img
          className="hero__img"
          src={heroImage}
          alt="Warm sunlit interior of Harth Coffee café with wooden bar and espresso machine"
          loading="eager"
          fetchpriority="high"
        />
        <span className="hero__overlay-text">Good Coffee Brighter Days</span>
        <span className="hero__script">Good Coffee<br />Brighter Days</span>
      </div>
    </section>
  )
}
