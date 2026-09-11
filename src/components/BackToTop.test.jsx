import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import BackToTop from './BackToTop'

function scrollTo(y) {
  window.scrollY = y
  fireEvent.scroll(window)
}

describe('BackToTop', () => {
  it('stays hidden near the top of the page', () => {
    window.scrollY = 0
    render(<BackToTop />)

    expect(
      screen.queryByRole('button', { name: /back to top/i })
    ).not.toBeInTheDocument()
  })

  it('appears once scrolled past the threshold', () => {
    window.scrollY = 0
    render(<BackToTop />)

    scrollTo(400)

    expect(
      screen.getByRole('button', { name: /back to top/i })
    ).toBeInTheDocument()
  })

  it('hides again when scrolled back up', () => {
    window.scrollY = 400
    render(<BackToTop />)
    expect(
      screen.getByRole('button', { name: /back to top/i })
    ).toBeInTheDocument()

    scrollTo(10)

    expect(
      screen.queryByRole('button', { name: /back to top/i })
    ).not.toBeInTheDocument()
  })

  it('scrolls smoothly to the top when clicked', async () => {
    const user = userEvent.setup()
    window.scrollY = 400
    render(<BackToTop />)

    await user.click(screen.getByRole('button', { name: /back to top/i }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('jumps without animation when reduced motion is requested', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
    )
    const user = userEvent.setup()
    window.scrollY = 400
    render(<BackToTop />)

    await user.click(screen.getByRole('button', { name: /back to top/i }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('removes its scroll listener on unmount', () => {
    const remove = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<BackToTop />)

    unmount()

    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
  })
})
