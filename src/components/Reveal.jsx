import { useEffect, useRef, useState } from 'react'

import { prefersReducedMotion } from '../lib/motion'

function Reveal({
  as: Tag = 'div',
  index = 0,
  className = '',
  style,
  children,
  ...props
}) {
  const ref = useRef(null)
  // Reduced motion means no reveal at all, so start shown rather than fading
  // content in as it scrolls past.
  const [visible, setVisible] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const node = ref.current
    // Checked again rather than read from state, so the effect stays free of
    // reactive dependencies and the observer is built at most once.
    if (!node || prefersReducedMotion()) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 700ms cubic-bezier(.2,.7,.2,1) ${index * 90}ms, transform 700ms cubic-bezier(.2,.7,.2,1) ${index * 90}ms`,
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Reveal
