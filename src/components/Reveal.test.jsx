import { render, screen } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'

import Reveal from './Reveal'

// Not a hook. Captures the real observer callback so a test can drive intersection,
// rather than the do-nothing stub in src/test-utils/setup.js.
function controllableObserver() {
  const instances = []
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback) {
        this.callback = callback
        this.unobserve = vi.fn()
        this.disconnect = vi.fn()
        instances.push(this)
      }
      observe() {}
    }
  )
  return instances
}

describe('Reveal', () => {
  it('starts hidden and fades in when it intersects', () => {
    const instances = controllableObserver()
    render(<Reveal>content</Reveal>)

    expect(screen.getByText('content')).toHaveStyle({ opacity: '0' })

    act(() => instances[0].callback([{ isIntersecting: true }]))

    expect(screen.getByText('content')).toHaveStyle({ opacity: '1' })
  })

  it('stays hidden while it has not intersected', () => {
    const instances = controllableObserver()
    render(<Reveal>content</Reveal>)

    act(() => instances[0].callback([{ isIntersecting: false }]))

    expect(screen.getByText('content')).toHaveStyle({ opacity: '0' })
  })

  it('stops observing after the first reveal', () => {
    const instances = controllableObserver()
    render(<Reveal>content</Reveal>)

    act(() => instances[0].callback([{ isIntersecting: true }]))

    expect(instances[0].unobserve).toHaveBeenCalled()
  })

  it('renders visible immediately under reduced motion', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    const observed = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe = observed
        unobserve() {}
        disconnect() {}
      }
    )

    render(<Reveal>content</Reveal>)

    expect(screen.getByText('content')).toHaveStyle({ opacity: '1' })
    // No observer at all, so nothing can fade in on scroll.
    expect(observed).not.toHaveBeenCalled()
  })

  it('renders as the requested element and keeps its props', () => {
    controllableObserver()
    render(
      <Reveal as="section" className="custom" aria-label="block">
        content
      </Reveal>
    )

    const node = screen.getByLabelText('block')
    expect(node.tagName).toBe('SECTION')
    expect(node).toHaveClass('custom')
  })

  it('staggers the transition delay by index', () => {
    controllableObserver()
    render(<Reveal index={3}>content</Reveal>)

    expect(screen.getByText('content').style.transition).toContain('270ms')
  })

  it('disconnects on unmount', () => {
    const instances = controllableObserver()
    const { unmount } = render(<Reveal>content</Reveal>)

    unmount()

    expect(instances[0].disconnect).toHaveBeenCalled()
  })
})
