import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Link, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import ScrollToTop from './ScrollToTop'

function Harness({ initialEntries }) {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <ScrollToTop />
      <Link to="/next">go next</Link>
      <Link to="/next#section">go to anchor</Link>
      <Routes>
        <Route path="*" element={<p>page</p>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ScrollToTop', () => {
  it('scrolls to the top on navigation', async () => {
    const user = userEvent.setup()
    render(<Harness initialEntries={['/']} />)
    window.scrollTo.mockClear()

    await user.click(screen.getByRole('link', { name: 'go next' }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('leaves anchor links alone', async () => {
    const user = userEvent.setup()
    render(<Harness initialEntries={['/']} />)
    window.scrollTo.mockClear()

    await user.click(screen.getByRole('link', { name: 'go to anchor' }))

    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('jumps without animation under reduced motion', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }))
    const user = userEvent.setup()
    render(<Harness initialEntries={['/']} />)
    window.scrollTo.mockClear()

    await user.click(screen.getByRole('link', { name: 'go next' }))

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('renders nothing', () => {
    const { container } = render(<Harness initialEntries={['/']} />)
    expect(container.querySelector('p')).toBeInTheDocument()
  })
})
