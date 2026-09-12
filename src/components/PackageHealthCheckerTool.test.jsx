import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import PackageHealthCheckerTool from './PackageHealthCheckerTool'

// The component itself is synced from the package-health-checker repo and must
// not be hand-edited. These tests live here on purpose: they pin the behaviour
// this site depends on, so a bad sync fails CI instead of reaching production.

const clean = {
  name: 'lodash',
  description: 'Utility library',
  latest_version: '4.17.21',
  last_publish_date: '2021-02-20T00:00:00Z',
  vulnerability_count: 0,
  vulnerabilities: [],
}

const vulnerable = {
  ...clean,
  name: 'minimist',
  vulnerability_count: 1,
  vulnerabilities: [
    {
      id: 'GHSA-xxxx',
      cve: 'CVE-2021-44906',
      severity: 'critical',
      summary: 'Prototype pollution',
      advisory_url: 'https://example.com/advisory',
    },
  ],
}

function mockFetch(response, ok = true, status = ok ? 200 : 404) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => response,
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

async function search(term) {
  const user = userEvent.setup()
  await user.type(screen.getByPlaceholderText(/enter a package name/i), term)
  await user.click(screen.getByRole('button', { name: /search/i }))
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('PackageHealthCheckerTool', () => {
  it('reports a clean package', async () => {
    mockFetch(clean)
    render(<PackageHealthCheckerTool />)

    await search('lodash')

    expect(await screen.findByText('lodash')).toBeInTheDocument()
    expect(
      screen.getByText(/has no known vulnerabilities/i)
    ).toBeInTheDocument()
  })

  it('lists vulnerabilities with their advisory link', async () => {
    mockFetch(vulnerable)
    render(<PackageHealthCheckerTool />)

    await search('minimist')

    expect(await screen.findByText(/GHSA-xxxx/)).toBeInTheDocument()
    expect(screen.getByText(/vulnerability history \(1\)/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /advisory/i })).toHaveAttribute(
      'href',
      'https://example.com/advisory'
    )
  })

  it('shows an error when the package is not found', async () => {
    mockFetch({}, false)
    render(<PackageHealthCheckerTool />)

    await search('does-not-exist')

    expect(await screen.findByText(/package not found/i)).toBeInTheDocument()
  })

  it('shows an error when the request fails outright', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(<PackageHealthCheckerTool />)

    await search('lodash')

    expect(
      await screen.findByText(/could not reach the api/i)
    ).toBeInTheDocument()
  })

  it('does not call the API for an empty search', async () => {
    const fetchMock = mockFetch(clean)
    const user = userEvent.setup()
    render(<PackageHealthCheckerTool />)

    await user.click(screen.getByRole('button', { name: /search/i }))

    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('url-encodes scoped package names', async () => {
    const fetchMock = mockFetch(clean)
    render(<PackageHealthCheckerTool />)

    await search('@scope/pkg')

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(encodeURIComponent('@scope/pkg'))
    )
  })

  it('reports a configuration error when the API URL is missing at build time', async () => {
    // API_BASE_URL is read into a module-level const at import time, so the
    // shared default in vite.config.js's test.env is already too late to
    // override here — clear it and re-import fresh instead of vi.stubEnv().
    vi.stubEnv('VITE_PACKAGE_HEALTH_API_URL', '')
    vi.resetModules()
    const { default: FreshPackageHealthCheckerTool } =
      await import('./PackageHealthCheckerTool')
    render(<FreshPackageHealthCheckerTool />)

    expect(screen.getByRole('alert')).toHaveTextContent(/not configured/i)
    expect(
      screen.queryByPlaceholderText(/enter a package name/i)
    ).not.toBeInTheDocument()

    vi.unstubAllEnvs()
    vi.resetModules()
  })
})
