import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import App from './App'
import { SITE_ORIGIN } from './lib/site'
import { pages, catchAll } from './routes'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

const paths = pages.map((page) => page.path)

// Written out here rather than derived from routes.jsx on purpose. If this
// came from the same source the app reads, pointing a route at the wrong
// component would still pass. A mutation test confirmed exactly that gap.
const EXPECTED_CONTENT = {
  '/': /ambiguous requirements/i,
  '/projects': /selected work/i,
  '/package-health-checker': /npm ecosystem only/i,
  '/rice-calculator': /add a few ideas above/i,
  '/phc-case-study': /case study: package health checker/i,
  '/resume': /download/i,
}

describe('routes', () => {
  it.each(paths)('%s renders without crashing', (path) => {
    renderAt(path)

    // Catches a route falling through to the catch-all, or a page that threw.
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(screen.queryByText(/page not found/i)).not.toBeInTheDocument()

    // Proves the route renders its own page, not merely some page.
    expect(screen.getByText(EXPECTED_CONTENT[path])).toBeInTheDocument()
  })

  it.each(paths)('%s sets its own document title', (path) => {
    renderAt(path)

    const { title } = pages.find((page) => page.path === path)
    expect(document.title).toBe(
      title ? `${title} — Shelby Kelley` : 'Shelby Kelley'
    )
  })

  it.each(paths)('%s sets its own meta description', (path) => {
    renderAt(path)

    const tags = document.head.querySelectorAll('meta[name="description"]')
    // React appends, so a description left in index.html would duplicate.
    expect(tags).toHaveLength(1)
    expect(tags[0].getAttribute('content')).toBe(
      pages.find((page) => page.path === path).description
    )
  })

  it.each(paths)('%s declares a canonical URL for itself', (path) => {
    renderAt(path)

    const links = document.head.querySelectorAll('link[rel="canonical"]')
    expect(links).toHaveLength(1)
    expect(links[0].getAttribute('href')).toBe(`${SITE_ORIGIN}${path}`)
  })

  it.each(paths)('%s is left indexable', (path) => {
    renderAt(path)

    expect(
      document.head.querySelector('meta[name="robots"]')
    ).not.toBeInTheDocument()
  })

  it('renders the not-found page for an unknown route', () => {
    renderAt('/no-such-page')

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(document.title).toBe(`${catchAll.title} — Shelby Kelley`)
  })

  // Unknown URLs answer 200, so noindex is the only signal to crawlers.
  it('marks the not-found page noindex', () => {
    renderAt('/no-such-page')

    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex'
    )
  })

  // React Router matches a trailing slash to the same route, so the metadata
  // has to agree or a real page ships with a noindex tag.
  it.each(paths.filter((path) => path !== '/'))(
    '%s/ resolves to the same page and metadata',
    (path) => {
      renderAt(`${path}/`)

      const { title } = pages.find((page) => page.path === path)
      expect(document.title).toBe(`${title} — Shelby Kelley`)
      expect(
        document.head.querySelector('meta[name="robots"]')
      ).not.toBeInTheDocument()
      expect(
        document.head.querySelector('link[rel="canonical"]')
      ).toHaveAttribute('href', `${SITE_ORIGIN}${path}`)
    }
  )

  it('exposes a main landmark and a skip link on every page', () => {
    renderAt('/')

    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /skip to content/i })
    ).toHaveAttribute('href', '#main-content')
  })

  it('marks the active nav item with aria-current', () => {
    renderAt('/projects')

    expect(screen.getByRole('link', { name: 'projects' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: 'home' })).not.toHaveAttribute(
      'aria-current'
    )
  })
})
