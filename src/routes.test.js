import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { SITE_ORIGIN } from './lib/site'
import { pages } from './routes'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const sitemap = readFileSync(join(publicDir, 'sitemap.xml'), 'utf8')
const robots = readFileSync(join(publicDir, 'robots.txt'), 'utf8')

describe('sitemap.xml', () => {
  it('uses the sitemaps.org namespace', () => {
    expect(sitemap).toContain(
      'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
    )
  })

  // The sitemap is hand-written, so this is what stops it drifting.
  it("lists exactly the app's routes", () => {
    const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1].replace(SITE_ORIGIN, ''))
      .map((path) => (path === '/' ? '/' : path.replace(/\/$/, '')))

    expect(listed.sort()).toEqual(pages.map((page) => page.path).sort())
  })

  it('points every entry at the canonical origin over https', () => {
    for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      expect(url.startsWith(`${SITE_ORIGIN}/`)).toBe(true)
    }
  })
})

describe('robots.txt', () => {
  it('advertises the sitemap', () => {
    expect(robots).toContain(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)
  })

  it('keeps crawlers off the resume PDF', () => {
    expect(robots).toMatch(/^Disallow: \/resume\.pdf$/m)
  })
})
