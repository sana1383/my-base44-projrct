import { useReveal } from '../hooks/useReveal.js'

/** Wraps children in a calm fade-up entrance triggered on scroll. */
export default function Reveal({ children, as: Tag = 'div', delay = 0, className = '', ...rest }) {
  const [ref, visible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
