import { LeafIcon, FlowerIcon, HomeIcon, CupIcon } from './Icons.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const values = [
  { icon: LeafIcon, title: 'تأمین مسئولانه', desc: 'قهوه‌ای بهتر برای سیاره‌ای سبزتر.' },
  { icon: FlowerIcon, title: 'رُست محلی', desc: 'حمایت از جوامع محلی.' },
  { icon: HomeIcon, title: 'فضاهای دنج', desc: 'برای ارتباطی صمیمانه‌تر.' },
  { icon: CupIcon, title: 'نوشیدنی‌های تخصصی', desc: 'فصلی، خلاقانه و خوش‌طعم.' },
]

export default function Values() {
  const { ref, visible } = useScrollReveal()
  return (
    <section className="values" ref={ref}>
      <div className="values__grid">
        {values.map((v, i) => (
          <div key={v.title} className={`value reveal${visible ? ' is-visible' : ''}`} data-delay={i + 1}>
            <div className="value__icon"><v.icon /></div>
            <h3 className="value__title">{v.title}</h3>
            <p className="value__desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
