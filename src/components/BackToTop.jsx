import { useState, useEffect } from 'react'

function BackToTop() {
  const [visible, setVisible] = useState(() => window.scrollY > 300)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-50 rounded-full border border-subtle bg-surface px-4 py-3 font-mono text-body no-underline hover:border-brand hover:text-brand transition-colors duration-200"
    >
      ↑
    </button>
  )
}

export default BackToTop
