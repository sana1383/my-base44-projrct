import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'horizon:favorites'

const FavoritesContext = createContext(null)

const readStored = () => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStored)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      /* storage unavailable (private mode) — favorites stay in memory */
    }
  }, [favorites])

  const toggleFavorite = useCallback((id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }, [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite, count: favorites.length }),
    [favorites, toggleFavorite, isFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
  return ctx
}
