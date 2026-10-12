import { Link } from 'react-router-dom'
import { brand } from '../data/site.js'

/** Minimal architectural mark + wordmark. */
export default function Logo({ to = '/', onClick, light = false, size = 30 }) {
  const inner = (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        className="brand__mark"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4.5 23.5V13.2L16 7l11.5 6.2v10.3"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M12.4 23.5v-6.2h7.2v6.2"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M2.5 26.5h27"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
      <span className="brand__text">
        <span className="brand__name" style={light ? { color: 'var(--white)' } : undefined}>
          {brand.name}
        </span>
        <span className="brand__sub">{brand.latinName}</span>
      </span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className="brand" onClick={onClick} aria-label={brand.name}>
        {inner}
      </button>
    )
  }

  return (
    <Link to={to} className="brand" aria-label={`${brand.name} — صفحهٔ اصلی`}>
      {inner}
    </Link>
  )
}
