import { LeafIcon, FlowerIcon, HomeIcon, CupIcon } from './Icons.jsx'
import { useScrollReveal } from '../hooks/useScrollReveal.js'

const values = [
  { icon: LeafIcon, title: 'Sustainably Sourced', desc: 'Better beans for a brighter planet.' },
  { icon: FlowerIcon, title: 'Locally Roasted', desc: 'Supporting local communities.' },
  { icon: HomeIcon, title: 'Cozy Spaces', desc: 'Designed for connection.' },
  { icon: CupIcon, title: 'Specialty Drinks', desc: 'Seasonal. Creative. Delicious.' },
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
