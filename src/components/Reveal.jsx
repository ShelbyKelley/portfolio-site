import { useEffect, useRef, useState } from 'react'

function Reveal({
  as: Tag = 'div',
  index = 0,
  className = '',
  style,
  children,
  ...props
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

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
