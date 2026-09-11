import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import App from '../App'

function renderApp(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

describe('theme toggle', () => {
  it('starts light and adds the dark class when toggled', async () => {
    const user = userEvent.setup()
    renderApp()

    expect(document.documentElement).not.toHaveClass('dark')

    await user.click(screen.getByRole('button', { name: /dark mode/i }))

    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('toggles back to light', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('button', { name: /dark mode/i }))
    await user.click(screen.getByRole('button', { name: /light mode/i }))

    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('restores the stored preference on load', () => {
    localStorage.setItem('theme', 'dark')
    renderApp()

    expect(document.documentElement).toHaveClass('dark')
    expect(
      screen.getByRole('button', { name: /light mode/i })
    ).toBeInTheDocument()
  })

  it('survives localStorage throwing', () => {
    const original = Storage.prototype.getItem
    Storage.prototype.getItem = () => {
      throw new Error('blocked')
    }

    try {
      expect(() => renderApp()).not.toThrow()
    } finally {
      Storage.prototype.getItem = original
    }
  })
})

describe('nav', () => {
  it('marks only the active route with aria-current', async () => {
    const user = userEvent.setup()
    renderApp('/')

    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute(
      'aria-current',
      'page'
    )

    await user.click(screen.getByRole('link', { name: 'projects' }))

    expect(screen.getByRole('link', { name: 'projects' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: 'home' })).not.toHaveAttribute(
      'aria-current'
    )
  })

  it('updates the document title when navigating', async () => {
    const user = userEvent.setup()
    renderApp('/')

    expect(document.title).toBe('Shelby Kelley')

    await user.click(screen.getByRole('link', { name: 'resume' }))

    expect(document.title).toBe('Resume — Shelby Kelley')
  })
})
