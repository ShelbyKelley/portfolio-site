import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { scrollBehavior } from '../lib/motion'

// React Router keeps the previous scroll offset across navigations.
// RR7's <ScrollRestoration> needs a data router, which this app doesn't use.
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // A hash means the browser is jumping to an anchor, leave it alone.
    if (hash) return

    window.scrollTo({ top: 0, behavior: scrollBehavior() })
  }, [pathname, hash])

  return null
}

export default ScrollToTop
