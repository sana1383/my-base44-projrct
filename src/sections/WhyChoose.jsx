import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { whyFeatures, whyStats } from '../data/site.js'

export default function WhyChoose() {
  return (
    <section className="section section--navy" id="why" aria-labelledby="why-title">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="section-head__text">
              <span className="eyebrow">چرا افق</span>
              <h2 id="why-title">آرامش یک انتخاب درست</h2>
            </div>
            <p className="section-head__aside" style={{ color: 'rgba(255,255,255,.7)' }}>
              معاملهٔ ملک تصمیم بزرگی است. ما آن را با داده، تجربه و مسئولیت‌پذیری همراهی
              می‌کنیم.
            </p>
          </div>
        </Reveal>

        <Reveal className="why__grid" delay={80}>
          {whyFeatures.map((feature) => (
            <article className="why-item" key={feature.id}>
              <span className="why-item__icon" aria-hidden="true">
                <Icon name={feature.icon} size={21} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </Reveal>

        <Reveal className="why__stats" delay={140}>
          {whyStats.map((stat) => (
            <div key={stat.label}>
              <div className="why__stat-value">{stat.value}</div>
              <p className="why__stat-label">{stat.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
