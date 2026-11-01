import { Link } from 'react-router-dom'

/**
 * Tek buton component'i; üç şekilde kullanılabilir:
 *   <Button to="/katil">            → site içi bağlantı (React Router)
 *   <Button href="https://...">     → dış bağlantı (yeni sekmede açılır)
 *   <Button type="submit">          → normal <button>
 *
 * variant: 'primary' | 'outline' | 'ghost' | 'light'
 * size:    'sm' | 'md' | 'lg'
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  block = false,
  className = '',
  children,
  ...props
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, block && 'btn--block', className]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
