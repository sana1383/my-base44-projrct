import { useState, useEffect } from 'react'
import { SearchIcon, CartIcon, MenuIcon } from './Icons.jsx'

const navLinks = [
  { label: 'Home', target: 'hero' },
  { label: 'Menu', target: 'menu' },
  { label: 'Our Story', target: 'story' },
  { label: 'Locations', target: 'locations' },
  { label: 'Shop', target: 'shop' },
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

  const cls = `header${scrolled ? ' header--scrolled' : ''}${dark && scrolled ? ' header--dark' : ''}`

  const handleNav = (e, target) => {
    e.preventDefault()
    onNavigate(target)
  }

  return (
    <header className={cls}>
      <div className="header__inner">
        <button className="logo" onClick={(e) => handleNav(e, 'hero')} aria-label="Harth Coffee home">
          <span className="logo__main">HARTH</span>
          <span className="logo__sub">COFFEE</span>
        </button>

        <nav className="nav" aria-label="Primary">
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
          <button className="icon-btn" onClick={() => onOpen('search')} aria-label="Search menu items">
            <SearchIcon width="20" height="20" />
          </button>
          <button className="icon-btn" onClick={() => onOpen('cart')} aria-label={`Cart with ${cartCount} items`} style={{ position: 'relative' }}>
            <CartIcon width="20" height="20" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="btn btn--outline" onClick={() => onOpen('reservation')} style={dark && scrolled ? { borderColor: 'rgba(255,253,248,0.35)', color: 'var(--warm-white)' } : {}}>
            Reserve a Table
          </button>
          <button className="menu-toggle" aria-label="Open menu" aria-expanded={mobileOpen ? 'true' : 'false'} onClick={() => onOpen('mobile')}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
