import { useState, useCallback, useEffect, useRef } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import Menu from './components/Menu.jsx'
import Story from './components/Story.jsx'
import Values from './components/Values.jsx'
import Footer from './components/Footer.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import SearchModal from './components/SearchModal.jsx'
import ReservationModal from './components/ReservationModal.jsx'
import StoryModal from './components/StoryModal.jsx'
import FullMenuModal from './components/FullMenuModal.jsx'
import LocationsModal from './components/LocationsModal.jsx'
import ShopModal from './components/ShopModal.jsx'

export default function App() {
  const [cart, setCart] = useState([])
  const [active, setActive] = useState(null) // which modal/drawer is open
  const [activeSection, setActiveSection] = useState('hero')
  const [toast, setToast] = useState(null)
  const toastTimer = useRef(null)

  // ---- Cart ----
  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    setToast(`${item.name} added to your order`)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2500)
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id))
    } else {
      setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i))
    }
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)

  // ---- Navigation ----
  const navigate = useCallback((target) => {
    if (target === 'locations') { setActive('locations'); return }
    if (target === 'shop') { setActive('shop'); return }
    const el = document.getElementById(target)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  const openModal = useCallback((name) => setActive(name))
  const closeModal = useCallback(() => setActive(null))

  // ---- Active section tracking ----
  useEffect(() => {
    const sections = ['hero', 'menu', 'story', 'footer']
    const onScroll = () => {
      const y = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && y >= el.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a href="#hero" className="skip-link">Skip to content</a>

      <Header
        cartCount={cartCount}
        onOpen={openModal}
        onNavigate={navigate}
        activeSection={activeSection}
        mobileOpen={active === 'mobile'}
      />

      <main>
        <Hero onNavigate={navigate} onOpen={openModal} />
        <Stats />
        <Menu onAdd={addToCart} onOpen={openModal} />
        <Story onOpen={openModal} />
        <Values />
      </main>

      <Footer onOpen={openModal} />

      {/* ---- Toast ---- */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--espresso)', color: 'var(--warm-white)', padding: '12px 24px',
          borderRadius: 'var(--radius-pill)', fontSize: '0.85rem', zIndex: 400,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)', animation: 'fadeUp 0.3s var(--ease)',
          pointerEvents: 'none',
        }} role="status">
          {toast}
        </div>
      )}

      {/* ---- Drawers & Modals ---- */}
      <MobileMenu open={active === 'mobile'} onClose={closeModal} onNavigate={navigate} onOpen={openModal} />
      <CartDrawer open={active === 'cart'} onClose={closeModal} cart={cart} onUpdateQty={updateQty} onRemove={removeFromCart} />
      <SearchModal open={active === 'search'} onClose={closeModal} onAdd={addToCart} />
      <ReservationModal open={active === 'reservation'} onClose={closeModal} />
      <StoryModal open={active === 'story'} onClose={closeModal} />
      <FullMenuModal open={active === 'fullmenu'} onClose={closeModal} onAdd={addToCart} />
      <LocationsModal open={active === 'locations'} onClose={closeModal} />
      <ShopModal open={active === 'shop'} onClose={closeModal} />
    </>
  )
}
