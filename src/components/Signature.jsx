import CoffeeBean3D from './CoffeeBean3D.jsx'

/**
 * The signature band: the 3D coffee bean gets its own space between the values
 * strip and the footer, so it never competes with the hero copy, the hero video
 * or any other section's content. Its copy reuses existing brand language.
 */
export default function Signature() {
  return (
    <section className="signature" aria-labelledby="signature-title">
      <div className="signature__inner">
        <div className="signature__media">
          <CoffeeBean3D />
        </div>
        <div className="signature__copy">
          <div className="eyebrow signature__eyebrow">امضای هارث</div>
          <h2 className="signature__title" id="signature-title">
            قهوه خوب،
            <br />
            فردایی روشن‌تر
          </h2>
          <div className="signature__rule" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
