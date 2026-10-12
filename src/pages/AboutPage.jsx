import PageHero from '../components/PageHero.jsx'
import About from '../sections/About.jsx'
import WhyChoose from '../sections/WhyChoose.jsx'
import CTASection from '../sections/CTASection.jsx'
import Reveal from '../components/Reveal.jsx'
import { sectionImages } from '../data/site.js'

const values = [
  {
    title: 'درستکاری پیش از معامله',
    text: 'اگر ملکی با هدف شما هم‌خوان نباشد، صریح می‌گوییم — حتی اگر به سود کوتاه‌مدت ما نباشد.',
  },
  {
    title: 'داده به‌جای حدس',
    text: 'هر ارزیابی با داده‌های واقعی بازار، سابقهٔ معاملات محله و بازدید میدانی پشتیبانی می‌شود.',
  },
  {
    title: 'همراهی تا پایان',
    text: 'یک مشاور ثابت از نخستین تماس تا تحویل کلید پاسخ‌گوی شماست؛ نه یک مرکز تماس.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="درباره ما"
        title="ما که هستیم"
        description="املاک افق از یک باور ساده شکل گرفت: پیدا کردن خانه باید آرام، شفاف و قابل‌اعتماد باشد."
        image={sectionImages.aboutHero}
        crumbs={[{ label: 'درباره ما' }]}
      />

      <About />

      <section className="section section--ivory">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <span className="eyebrow">ارزش‌های ما</span>
                <h2>سه اصلی که کنار نمی‌گذاریم</h2>
              </div>
            </div>
          </Reveal>

          <Reveal className="services__list" delay={80}>
            {values.map((value, index) => (
              <article className="service-item" key={value.title}>
                <span className="service-item__num">{`۰${index + 1}`}</span>
                <h3 className="service-item__title">{value.title}</h3>
                <p className="service-item__text">{value.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <WhyChoose />
      <CTASection />
    </>
  )
}
