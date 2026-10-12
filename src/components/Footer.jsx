import { useState } from 'react'
import { InstagramIcon, TikTokIcon, PinterestIcon, SpotifyIcon, ArrowRight } from './Icons.jsx'

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
      setMsg({ type: 'err', text: 'Please enter your email address.' })
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg({ type: 'err', text: 'Please enter a valid email address.' })
      return
    }
    // Frontend demonstration — no backend newsletter integration configured.
    setMsg({ type: 'ok', text: "Thank you for subscribing! We'll be in touch soon." })
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
          <p className="footer__tagline">A<br />WARMER<br />TOMORROW.</p>
        </div>

        <div className="newsletter">
          <h3>Join our newsletter</h3>
          <p>Be the first to know about new drinks, events and more.</p>
          <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
            <input
              className="newsletter__input"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setMsg(null) }}
              aria-label="Email address for newsletter"
            />
            <button className="newsletter__submit" type="submit" aria-label="Subscribe to newsletter">
              <ArrowRight width="18" height="18" />
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
        <span>© 2026 Harth Coffee. All rights reserved.</span>
        <div className="footer__bottom-links">
          <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpen('reservation') }}>Contact</a>
        </div>
      </div>
    </footer>
  )
}
