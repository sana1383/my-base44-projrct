import { Fragment } from 'react'

const stats = [
  { num: '10K+', label: 'Happy Customers' },
  { num: '4.8 ★', label: 'Average Rating' },
  { num: '3', label: 'Locations' },
]

export default function Stats() {
  return (
    <div className="stats" aria-label="Brand statistics" role="list">
      {stats.map((s, i) => (
        <Fragment key={s.label}>
          <div className="stat" role="listitem">
            <div className="stat__num">{s.num}</div>
            <div className="stat__label">{s.label}</div>
          </div>
          {i < stats.length - 1 && <div className="stat-divider" aria-hidden="true" />}
        </Fragment>
      ))}
    </div>
  )
}
