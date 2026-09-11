export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollBehavior() {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}
