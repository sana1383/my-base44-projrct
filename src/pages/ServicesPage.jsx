import PageHero from '../components/PageHero.jsx'
import Services from '../sections/Services.jsx'
import CTASection from '../sections/CTASection.jsx'
import Reveal from '../components/Reveal.jsx'
import { sectionImages } from '../data/site.js'

const steps = [
  {
    title: 'گفت‌وگوی نخست',
    text: 'هدف شما را می‌شنویم: سبک زندگی، بودجه، افق زمانی و اولویت‌های غیرقابل‌گذشت.',
  },
  {
    title: 'انتخاب گزینه‌ها',
    text: 'فهرست کوتاهی از املاک مرتبط — از جمله موارد خارج از فهرست عمومی — آماده می‌کنیم.',
  },
  {
    title: 'بازدید و ارزیابی',
    text: 'بازدید هماهنگ، بررسی فنی و گزارش شفاف از ارزش واقعی ملک و هزینه‌های معامله.',
  },
  {
    title: 'تا تحویل کلید',
    text: 'مذاکره، تنظیم قرارداد و پیگیری اداری تا روزی که کلید را تحویل می‌گیرید.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="خدمات"
        title="خدماتی که ارائه می‌دهیم"
        description="از فروش و بازاریابی ملک تا مشاورهٔ سرمایه‌گذاری، ارزیابی و جابه‌جایی — همه در یک تیم."
        image={sectionImages.servicesHero}
        crumbs={[{ label: 'خدمات' }]}
      />

      <Services />

      <section className="section section--ivory">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div className="section-head__text">
                <span className="eyebrow">فرایند کار</span>
                <h2>چهار گام روشن تا معامله</h2>
              </div>
              <p className="section-head__aside">
                در هر گام می‌دانید کجای مسیر هستید و گام بعدی چیست.
              </p>
            </div>
          </Reveal>

          <Reveal className="services__list" delay={80}>
            {steps.map((step, index) => (
              <article className="service-item" key={step.title}>
                <span className="service-item__num">{`۰${index + 1}`}</span>
                <h3 className="service-item__title">{step.title}</h3>
                <p className="service-item__text">{step.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
