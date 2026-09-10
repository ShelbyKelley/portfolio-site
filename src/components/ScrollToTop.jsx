import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router keeps the previous scroll offset across client-side
// navigations, so a link clicked halfway down a page lands halfway down the
// next one. Reset on every pathname change, honoring reduced-motion.
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
