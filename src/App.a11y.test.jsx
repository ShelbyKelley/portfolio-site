import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import * as matchers from 'vitest-axe/matchers'

import App from './App'
import { pages } from './routes'

expect.extend(matchers)

// axe cannot evaluate colour contrast here: jsdom does no layout or painting,
// so those rules are disabled and covered by src/contrast.test.js instead.
const axeOptions = {
  rules: { 'color-contrast': { enabled: false } },
}

describe('accessibility', () => {
  it.each(pages.map((page) => page.path))(
    '%s has no axe violations',
    async (path) => {
      const { container } = render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      )

      expect(await axe(container, axeOptions)).toHaveNoViolations()
    }
  )

  it('the not-found page has no axe violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/nope']}>
        <App />
      </MemoryRouter>
    )

    expect(await axe(container, axeOptions)).toHaveNoViolations()
  })
})
