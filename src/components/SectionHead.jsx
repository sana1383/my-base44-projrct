/** Shared section heading: small champagne label + large title, optional aside/actions. */
export default function SectionHead({ eyebrow, title, aside, center = false, children }) {
  return (
    <div className={`section-head ${center ? 'section-head--center' : ''}`.trim()}>
      <div className="section-head__text">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
      </div>
      {aside ? <p className="section-head__aside">{aside}</p> : null}
      {children}
    </div>
  )
}
