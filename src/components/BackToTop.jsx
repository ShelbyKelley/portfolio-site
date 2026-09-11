import { useState, useEffect } from 'react'

import { scrollBehavior } from '../lib/motion'

function BackToTop() {
  const [visible, setVisible] = useState(() => window.scrollY > 300)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: scrollBehavior() })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-50 rounded-full border border-control-border bg-surface px-4 py-3 font-mono text-body no-underline hover:border-brand hover:text-brand transition-colors duration-200"
    >
      ↑
    </button>
  )
}

export default BackToTop
