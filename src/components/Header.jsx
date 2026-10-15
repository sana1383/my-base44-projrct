import { useState, useEffect } from 'react'
import { SearchIcon, CartIcon } from './Icons.jsx'

const navLinks = [
  { label: 'خانه', target: 'hero' },
  { label: 'منو', target: 'menu' },
  { label: 'داستان ما', target: 'story' },
  { label: 'شعب ما', target: 'locations' },
  { label: 'فروشگاه', target: 'shop' },
]

export default function Header({ cartCount, onOpen, onNavigate, activeSection, mobileOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Dark header over story & footer sections
      const story = document.getElementById('story')
      const footer = document.getElementById('footer')
      const storyTop = story?.offsetTop ?? Infinity
      const footerTop = footer?.offsetTop ?? Infinity
      setDark(y >= storyTop - 80 && y < footerTop)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // At the top the bar floats transparently over the hero video with light ink;
  // once the page moves it becomes the solid bar, dark over the story & footer.
  const cls = [
    'header',
    scrolled ? 'header--scrolled' : 'header--on-media',
    dark && scrolled ? 'header--dark' : '',
  ].filter(Boolean).join(' ')

  const handleNav = (e, target) => {
    e.preventDefault()
    onNavigate(target)
  }

  return (
    <header className={cls}>
      <div className="header__inner">
        <button className="logo" onClick={(e) => handleNav(e, 'hero')} aria-label="HARTH COFFEE — صفحه اصلی">
          <span className="logo__main">HARTH</span>
          <span className="logo__sub">COFFEE</span>
        </button>

        <nav className="nav" aria-label="فهرست اصلی">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              className={`nav__link${activeSection === link.target ? ' nav__link--active' : ''}`}
              onClick={(e) => handleNav(e, link.target)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <button className="icon-btn" onClick={() => onOpen('search')} aria-label="جست‌وجو در منو">
            <SearchIcon width="20" height="20" />
          </button>
          <button className="icon-btn" onClick={() => onOpen('cart')} aria-label={`سبد خرید با ${cartCount} کالا`} style={{ position: 'relative' }}>
            <CartIcon width="20" height="20" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="btn btn--outline" onClick={() => onOpen('reservation')}>
            رزرو میز
          </button>
          <button className="menu-toggle" aria-label="باز کردن منو" aria-expanded={mobileOpen ? 'true' : 'false'} onClick={() => onOpen('mobile')}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
