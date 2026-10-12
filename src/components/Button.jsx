import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

/**
 * One button primitive for the whole site.
 * `to` renders a router link, `href` an anchor, otherwise a <button>.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size,
  icon,
  iconPosition = 'end',
  className = '',
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, size ? `btn--${size}` : '', className]
    .filter(Boolean)
    .join(' ')

  // In a right-to-left layout "forward" points to the left.
  const iconClass = iconPosition === 'end' ? 'btn__icon btn__icon--forward' : 'btn__icon'

  const content = (
    <>
      {icon && iconPosition === 'start' ? (
        <span className="btn__icon">
          <Icon name={icon} size={16} />
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === 'end' ? (
        <span className={iconClass}>
          <Icon name={icon} size={16} />
        </span>
      ) : null}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
