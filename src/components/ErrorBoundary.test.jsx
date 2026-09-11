import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import ErrorBoundary from './ErrorBoundary'

function Boom() {
  throw new Error('boom')
}

describe('ErrorBoundary', () => {
  it('renders children when nothing throws', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <p>all good</p>
        </ErrorBoundary>
      </MemoryRouter>
    )

    expect(screen.getByText('all good')).toBeInTheDocument()
  })

  it('shows a recovery link instead of a blank page when a child throws', () => {
    // Silence React's log of the caught error.
    vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute(
      'href',
      '/'
    )
  })

  it('logs the error for debugging', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>
      </MemoryRouter>
    )

    expect(spy).toHaveBeenCalledWith(
      'Unhandled render error:',
      expect.objectContaining({ message: 'boom' }),
      expect.any(String)
    )
  })

  it('clears the error when the recovery link is used', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const user = userEvent.setup()

    function Toggle({ shouldThrow }) {
      if (shouldThrow) throw new Error('boom')
      return <p>recovered</p>
    }

    function Harness() {
      const [broken, setBroken] = useState(true)
      return (
        <MemoryRouter>
          <ErrorBoundary>
            <Toggle shouldThrow={broken} />
          </ErrorBoundary>
          <button type="button" onClick={() => setBroken(false)}>
            fix it
          </button>
        </MemoryRouter>
      )
    }

    render(<Harness />)
    expect(
      screen.getByRole('heading', { name: /something went wrong/i })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /fix it/i }))
    await user.click(screen.getByRole('link', { name: /back to home/i }))

    expect(screen.getByText('recovered')).toBeInTheDocument()
  })
})
