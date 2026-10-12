import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Resets scroll on route change (keeps in-page #anchors working). */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
