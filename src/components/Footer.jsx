import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import { brand, footerLegal, navItems, socials } from '../data/site.js'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo light />
            <p className="footer__desc">
              املاک افق، همراه شما در یافتن خانه‌های استثنایی و سرمایه‌گذاری‌های هوشمند؛ با
              مشاورهٔ تخصصی، شفافیت کامل و احترام به زمان شما.
            </p>
            <div className="social-row">
              {socials.map((item) => (
                <a
                  key={item.id}
                  className="social-link"
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

          <nav aria-label="ناوبری فوتر">
            <h2 className="footer__col-title">دسترسی سریع</h2>
            <ul className="footer__links">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="footer__col-title">تماس</h2>
            <ul className="footer__contact">
              <li>
                <Icon name="phone" size={16} />
                <a href={`tel:${brand.phoneHref}`}>{brand.phone}</a>
              </li>
              <li>
                <Icon name="mail" size={16} />
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
              <li>
                <Icon name="pin" size={16} />
                <span>{brand.address}</span>
              </li>
              <li>
                <Icon name="clock" size={16} />
                <span>{brand.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer__col-title">خبرنامه</h2>
            <div className="footer__newsletter">
              <p style={{ fontSize: 'var(--fs-sm)', lineHeight: 1.9 }}>
                تازه‌ترین املاک ممتاز و تحلیل‌های بازار را در ایمیل خود دریافت کنید.
              </p>
              {subscribed ? (
                <p className="footer__meta" role="status" style={{ color: 'var(--champagne-300)' }}>
                  ثبت شد. از همراهی شما سپاسگزاریم.
                </p>
              ) : (
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                  <label className="visually-hidden" htmlFor="newsletter-email">
                    نشانی ایمیل
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="نشانی ایمیل شما"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <button type="submit" aria-label="عضویت در خبرنامه">
                    <Icon name="arrowLeft" size={17} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {brand.name} — همهٔ حقوق محفوظ است.</span>
          <div className="footer__legal">
            {footerLegal.map((item) => (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
