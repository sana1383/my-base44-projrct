/* Inline SVG icon set — one consistent 24px grid, 1.7 stroke. */

const paths = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
  ),
  menu: (
    <>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="14" y2="17" />
    </>
  ),
  close: (
    <>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.2" y2="16.2" />
    </>
  ),
  bed: (
    <>
      <path d="M2 17v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5" />
      <path d="M2 17h20" />
      <path d="M6 10V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
      <path d="M4 17v3" />
      <path d="M20 17v3" />
    </>
  ),
  bath: (
    <>
      <path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6.5A2.5 2.5 0 0 1 8.5 4c1.2 0 2 .7 2.3 1.7" />
      <path d="M9.5 8.5h3" />
      <path d="M6 19l-1 2" />
      <path d="M18 19l1 2" />
    </>
  ),
  area: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3 9h4" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3c0 5-7.5 9.4-7.5 9.4Z" />
  ),
  star: (
    <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9L12 3.6Z" />
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="4" />
      <path d="m10.4 12.6 8.1-8.1" />
      <path d="m16.5 6.5 2.5 2.5" />
      <path d="m14 4 2.5 2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 21s7-3.2 7-9V5.4L12 3 5 5.4V12c0 5.8 7 9 7 9Z" />
      <path d="m9 12 2 2 4-4.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-5.6 6.5-10.4A6.5 6.5 0 0 0 5.5 10.6C5.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  expand: (
    <>
      <path d="M9 3H3v6" />
      <path d="M15 21h6v-6" />
      <path d="M21 9V3h-6" />
      <path d="M3 15v6h6" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v15" />
      <path d="M15 10h4a1 1 0 0 1 1 1v10" />
      <path d="M2.5 21h19" />
      <path d="M7.5 9h4" />
      <path d="M7.5 13h4" />
      <path d="M7.5 17h4" />
    </>
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16.5 5.4a3.2 3.2 0 0 1 0 6.2" />
      <path d="M17.5 14.6a5.5 5.5 0 0 1 3 4.9" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>
  ),
  chevronLeft: <path d="m14.5 5-7 7 7 7" />,
  chevronRight: <path d="m9.5 5 7 7-7 7" />,
  arrowLeft: (
    <>
      <line x1="20" y1="12" x2="4" y2="12" />
      <path d="m10 6-6 6 6 6" />
    </>
  ),
  arrowRight: (
    <>
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="m14 6 6 6-6 6" />
    </>
  ),
  arrowUpLeft: (
    <>
      <line x1="17" y1="17" x2="7" y2="7" />
      <path d="M15 7H7v8" />
    </>
  ),
  slider: (
    <>
      <path d="M4 8h10" />
      <path d="M18 8h2" />
      <path d="M4 16h4" />
      <path d="M12 16h8" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="10" cy="16" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 11v6" />
      <path d="M8 8.2v.1" />
      <path d="M12 17v-3.4a2.1 2.1 0 0 1 4.2 0V17" />
      <path d="M12 11v6" />
    </>
  ),
  telegram: <path d="M20.5 4.5 3.8 11.2c-.9.4-.9 1.6.1 1.9l3.8 1.2 1.4 4.4c.3.9 1.4 1 1.9.2l2-3 3.9 2.9c.6.5 1.5.1 1.6-.6l2.4-12.6c.2-.9-.7-1.6-1.4-1.1Z" />,
  whatsapp: (
    <>
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L4 20.5l1.5-4a8.4 8.4 0 1 1 15-4.9Z" />
      <path d="M9 9.4c0 3 2.3 5.3 5.3 5.3.6 0 1.2-.5 1.2-1.1l-1.6-.9-.9.9a4 4 0 0 1-1.9-1.9l.9-.9-.9-1.6c-.6 0-1.1.5-1.1 1.2Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="m12 4 1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" />
    </>
  ),
}

export default function Icon({ name, size = 18, filled = false, className, style }) {
  const content = paths[name]
  if (!content) return null

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {content}
    </svg>
  )
}
