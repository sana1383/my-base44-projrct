import { Fragment } from 'react'

const stats = [
  { num: '10K+', label: 'مشتری راضی' },
  { num: '4.8 ★', label: 'میانگین امتیاز' },
  { num: '3', label: 'شعبه' },
]

export default function Stats() {
  return (
    <div className="stats" aria-label="آمار برند" role="list">
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
