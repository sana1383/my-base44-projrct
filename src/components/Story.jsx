import { storyImage } from '../data/menuItems.js'
import { ArrowUpLeft } from './Icons.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

export default function Story({ onOpen }) {
  const { ref, visible } = useScrollReveal()

  return (
    <section className="story" id="story" ref={ref}>
      <div className={`story__left reveal${visible ? ' is-visible' : ''}`}>
        <div className="eyebrow">داستان ما</div>
        <h2>جایی<br />برای آدم‌های<br />خوب</h2>
        <p>
          هارت کافی با یک ایده ساده آغاز شد: قهوه خوب، آدم‌ها را به هم نزدیک می‌کند.
        </p>
        <p>
          ما فضایی صمیمی می‌سازیم تا برای گفت‌وگوهای دل‌نشین، لحظه‌های آرام و
          فردایی روشن‌تر کنار هم باشیم.
        </p>
        <button className="story__cta" onClick={() => onOpen('story')}>
          داستان ما <span className="arrow"><ArrowUpLeft width="16" height="16" /></span>
        </button>
      </div>

      <div className={`story__center reveal${visible ? ' is-visible' : ''}`} data-delay="1">
        <img
          src={storyImage}
          alt="یک لاته خوش‌عکس در کنار دفتری روی میز چوبی"
          loading="lazy"
        />
      </div>

      <div className={`story__right reveal${visible ? ' is-visible' : ''}`} data-delay="2">
        <div className="story__right-text">
          <span>آدم‌های خوب</span>
          <span>قهوه خوب</span>
        </div>
        <div className="story__divider" />
        <p className="story__right-tag">همیشه،<br />فردایی گرم‌تر.</p>
      </div>
    </section>
  )
}
