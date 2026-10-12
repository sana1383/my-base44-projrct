import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { brand, navItems } from '../data/site.js'
import { useFavorites } from '../context/FavoritesContext.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { count } = useFavorites()

  // Transparent only while sitting over the home hero.
  const overHero = pathname === '/'
  const solid = !overHero || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', menuOpen)
    return () => document.documentElement.classList.remove('no-scroll')
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`)

  return (
    <>
      <header className={`site-header ${solid ? 'is-solid' : ''}`.trim()}>
        <div className="container site-header__inner">
          <Logo />

          <nav className="site-header__nav" aria-label="ناوبری اصلی">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`nav-link ${isActive(item.to) ? 'is-active' : ''}`.trim()}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link
              to="/favorites"
              className="icon-btn header-fav"
              aria-label={`علاقه‌مندی‌های من (${count} ملک)`}
            >
              <Icon name="heart" size={17} filled={count > 0} />
              {count > 0 ? <span className="header-fav__count">{count}</span> : null}
            </Link>

            <a href={`tel:${brand.phoneHref}`} className="btn btn--ghost-light btn--sm site-header__phone">
              <Icon name="phone" size={15} />
              <span>{brand.phone}</span>
            </a>

            <button
              type="button"
              className="burger"
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={`mobile-nav ${menuOpen ? 'is-open' : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
        hidden={!menuOpen}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo onClick={() => setMenuOpen(false)} size={28} />
          <button
            type="button"
            className="icon-btn"
            style={{ background: 'transparent', borderColor: 'var(--line-invert)', color: '#fff' }}
            aria-label="بستن منو"
            onClick={() => setMenuOpen(false)}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <nav className="container mobile-nav__list" aria-label="ناوبری موبایل">
          {navItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className="mobile-nav__link"
              style={{ transitionDelay: menuOpen ? `${80 + index * 55}ms` : '0ms' }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <Icon name="arrowLeft" size={18} />
            </Link>
          ))}
        </nav>

        <div className="container mobile-nav__footer">
          <a href={`tel:${brand.phoneHref}`} className="btn btn--light btn--block">
            <Icon name="phone" size={16} />
            {brand.phone}
          </a>
          <p className="mobile-nav__meta">
            {brand.address}
            <br />
            {brand.hours}
          </p>
        </div>
      </div>
    </>
  )
}
