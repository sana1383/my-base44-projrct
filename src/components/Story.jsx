import { storyImage } from '../data/menuItems.js'
import { ArrowUpRight } from './Icons.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function Story({ onOpen }) {
  const { ref, visible } = useScrollReveal()

  return (
    <section className="story" id="story" ref={ref}>
      <div className={`story__left reveal${visible ? ' is-visible' : ''}`}>
        <div className="eyebrow">Our Story</div>
        <h2>A space<br />for good people.</h2>
        <p>
          Harth Coffee started with a simple idea — great coffee brings people together.
        </p>
        <p>
          We're here to create a welcoming space for meaningful conversations, slower days
          and a brighter tomorrow.
        </p>
        <button className="story__cta" onClick={() => onOpen('story')}>
          Our Story <span className="arrow"><ArrowUpRight width="16" height="16" /></span>
        </button>
      </div>

      <div className={`story__center reveal${visible ? ' is-visible' : ''}`} data-delay="1">
        <img
          src={storyImage}
          alt="A beautifully crafted latte next to a notebook on a wooden table"
          loading="lazy"
        />
      </div>

      <div className={`story__right reveal${visible ? ' is-visible' : ''}`} data-delay="2">
        <div className="story__right-text">
          <span>GOOD</span>
          <span>PEOPLE</span>
          <span>GOOD</span>
          <span>COFFEE</span>
        </div>
        <div className="story__divider" />
        <p className="story__right-tag">Always<br />A Warmer<br />Tomorrow.</p>
      </div>
    </section>
  )
}
