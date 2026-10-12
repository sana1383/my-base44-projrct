import Reveal from '../components/Reveal.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'

export default function CTASection() {
  return (
    <section className="section section--ivory" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta-band">
          <span className="cta-band__icon" aria-hidden="true">
            <Icon name="key" size={30} />
          </span>
          <div className="cta-band__text">
            <h2 id="cta-title">آمادهٔ یافتن ملک ایده‌آل خود هستید؟</h2>
            <p>اجازه دهید کارشناسان ما شما را به خانه یا سرمایه‌گذاری درست هدایت کنند.</p>
          </div>
          <Button to="/contact" variant="primary" size="lg" icon="arrowLeft">
            تماس بگیرید
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
