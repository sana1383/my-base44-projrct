import { useState } from 'react'
import { InstagramIcon, TikTokIcon, PinterestIcon, SpotifyIcon, ArrowLeft } from './Icons.jsx'

const socials = [
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: TikTokIcon, label: 'TikTok', href: '#' },
  { icon: PinterestIcon, label: 'Pinterest', href: '#' },
  { icon: SpotifyIcon, label: 'Spotify', href: '#' },
]

export default function Footer({ onOpen }) {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setMsg({ type: 'err', text: 'لطفاً این فیلد را تکمیل کنید.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ type: 'err', text: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.' })
      return
    }
    // Frontend demonstration — no backend newsletter integration configured.
    setMsg({ type: 'ok', text: 'عضویت شما با موفقیت ثبت شد. به‌زودی با شما در تماس خواهیم بود.' })
    setEmail('')
  }

  return (
    <footer className="footer" id="footer">
      <div className="footer__top">
        <div className="footer__logo">
          <div className="logo">
            <span className="logo__main">HARTH</span>
            <span className="logo__sub">COFFEE</span>
          </div>
          <p className="footer__tagline">فردایی<br />گرم‌تر.</p>
        </div>

        <div className="newsletter">
          <h3>عضو خبرنامه ما شوید</h3>
          <p>از نوشیدنی‌های جدید، رویدادها و تازه‌ترین خبرهای ما زودتر باخبر شوید.</p>
          <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
            <input
              className="newsletter__input"
              type="email"
              dir="ltr"
              placeholder="آدرس ایمیل شما"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setMsg(null) }}
              aria-label="آدرس ایمیل برای عضویت در خبرنامه"
            />
            <button className="newsletter__submit" type="submit" aria-label="ثبت عضویت">
              <ArrowLeft width="18" height="18" />
            </button>
          </form>
          {msg && (
            <p className={`newsletter__msg newsletter__msg--${msg.type}`} role="status">
              {msg.text}
            </p>
          )}
        </div>

        <div className="footer__social">
          <div className="social-icons">
            {socials.map((s) => (
              <a key={s.label} className="social-icon" href={s.href} aria-label={s.label} onClick={(e) => e.preventDefault()}>
                <s.icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span><bdi dir="ltr">© 2026 HARTH COFFEE</bdi> — تمامی حقوق محفوظ است.</span>
        <div className="footer__bottom-links">
          <a href="#" onClick={(e) => e.preventDefault()}>حریم خصوصی</a>
          <a href="#" onClick={(e) => e.preventDefault()}>شرایط استفاده</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpen('reservation') }}>تماس با ما</a>
        </div>
      </div>
    </footer>
  )
}
