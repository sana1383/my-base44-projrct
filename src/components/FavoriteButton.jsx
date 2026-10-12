import Icon from './Icon.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'

/** Heart toggle backed by localStorage (see FavoritesContext). */
export default function FavoriteButton({ id, title, className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(id)

  return (
    <button
      type="button"
      className={`fav-btn ${active ? 'is-active' : ''} ${className}`.trim()}
      aria-pressed={active}
      aria-label={
        active ? `حذف «${title}» از علاقه‌مندی‌ها` : `افزودن «${title}» به علاقه‌مندی‌ها`
      }
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleFavorite(id)
      }}
    >
      <Icon name="heart" size={17} filled={active} />
    </button>
  )
}
