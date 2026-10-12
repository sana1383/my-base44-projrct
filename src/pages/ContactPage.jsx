import { useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { brand, sectionImages, socials } from '../data/site.js'

const subjects = [
  'خرید ملک',
  'فروش ملک',
  'سرمایه‌گذاری',
  'ارزیابی ملک',
  'موضوع دیگر',
]

export default function ContactPage() {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    subject: subjects[0],
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!values.name.trim()) next.name = 'نام خود را وارد کنید.'
    if (!values.phone.trim()) next.phone = 'شمارهٔ تماس را وارد کنید.'
    else if (!/^[0-9+\-\s()۰-۹]{7,}$/.test(values.phone.trim()))
      next.phone = 'شمارهٔ تماس معتبر نیست.'
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'ایمیل معتبر نیست.'
    if (!values.message.trim()) next.message = 'متن پیام را بنویسید.'

    setErrors(next)
    if (Object.keys(next).length) return
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="تماس"
        title="گفت‌وگو را شروع کنیم"
        description="پرسش، درخواست بازدید یا مشاورهٔ سرمایه‌گذاری — در نخستین فرصت پاسخ می‌دهیم."
        image={sectionImages.contactHero}
        crumbs={[{ label: 'تماس' }]}
      />

      <section className="section section--ivory">
        <div className="container contact__grid">
          <div className="contact-info">
            <div className="contact-info__item">
              <span className="contact-info__icon">
                <Icon name="phone" size={19} />
              </span>
              <div>
                <div className="contact-info__label">تلفن</div>
                <a className="contact-info__value" href={`tel:${brand.phoneHref}`}>
                  {brand.phone}
                </a>
              </div>
            </div>

            <div className="contact-info__item">
              <span className="contact-info__icon">
                <Icon name="mail" size={19} />
              </span>
              <div>
                <div className="contact-info__label">ایمیل</div>
                <a className="contact-info__value" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
              </div>
            </div>

            <div className="contact-info__item">
              <span className="contact-info__icon">
                <Icon name="pin" size={19} />
              </span>
              <div>
                <div className="contact-info__label">دفتر مرکزی</div>
                <div className="contact-info__value">{brand.address}</div>
              </div>
            </div>

            <div className="contact-info__item">
              <span className="contact-info__icon">
                <Icon name="clock" size={19} />
              </span>
              <div>
                <div className="contact-info__label">ساعات کاری</div>
                <div className="contact-info__value">{brand.hours}</div>
              </div>
            </div>

            <div>
              <div className="footer__col-title" style={{ color: 'var(--champagne)' }}>
                ما را دنبال کنید
              </div>
              <div className="social-row" style={{ marginBlockStart: 0 }}>
                {socials.map((item) => (
                  <a
                    key={item.id}
                    className="social-link"
                    style={{ borderColor: 'var(--line-2)', color: 'var(--ink-2)' }}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={item.label}
                  >
                    <Icon name={item.id} size={17} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-card">
            {sent ? (
              <>
                <h2 style={{ marginBlockEnd: '0.75rem' }}>پیام شما ثبت شد</h2>
                <div className="alert alert--success" role="status">
                  <Icon name="check" size={18} />
                  <span>
                    از اینکه با افق تماس گرفتید سپاسگزاریم. کارشناسان ما در نخستین فرصت پاسخ
                    می‌دهند.
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="btn--block"
                  style={{ marginBlockStart: '1.1rem' }}
                  onClick={() => {
                    setSent(false)
                    setValues({ name: '', phone: '', email: '', subject: subjects[0], message: '' })
                  }}
                >
                  ارسال پیام دیگر
                </Button>
              </>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 style={{ marginBlockEnd: '1.1rem' }}>فرم تماس</h2>

                <div className="form-grid">
                  <div className="form-grid form-grid--2">
                    <div className="field">
                      <label className="field__label" htmlFor="c-name">
                        نام و نام خانوادگی
                      </label>
                      <input
                        id="c-name"
                        className="input"
                        value={values.name}
                        onChange={set('name')}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name ? <span className="field__error">{errors.name}</span> : null}
                    </div>

                    <div className="field">
                      <label className="field__label" htmlFor="c-phone">
                        شمارهٔ تماس
                      </label>
                      <input
                        id="c-phone"
                        className="input"
                        value={values.phone}
                        onChange={set('phone')}
                        inputMode="tel"
                        autoComplete="tel"
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone ? <span className="field__error">{errors.phone}</span> : null}
                    </div>
                  </div>

                  <div className="form-grid form-grid--2">
                    <div className="field">
                      <label className="field__label" htmlFor="c-email">
                        ایمیل <span className="text-muted">(اختیاری)</span>
                      </label>
                      <input
                        id="c-email"
                        className="input"
                        value={values.email}
                        onChange={set('email')}
                        inputMode="email"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                      />
                      {errors.email ? <span className="field__error">{errors.email}</span> : null}
                    </div>

                    <div className="field">
                      <label className="field__label" htmlFor="c-subject">
                        موضوع
                      </label>
                      <select id="c-subject" className="select" value={values.subject} onChange={set('subject')}>
                        {subjects.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="c-message">
                      متن پیام
                    </label>
                    <textarea
                      id="c-message"
                      className="textarea"
                      value={values.message}
                      onChange={set('message')}
                      aria-invalid={Boolean(errors.message)}
                    />
                    {errors.message ? <span className="field__error">{errors.message}</span> : null}
                  </div>

                  <Button variant="primary" type="submit" className="btn--block" size="lg">
                    ارسال پیام
                  </Button>
                  <p className="form-note">
                    اطلاعات شما محرمانه می‌ماند و فقط برای پاسخ به همین درخواست استفاده می‌شود.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
