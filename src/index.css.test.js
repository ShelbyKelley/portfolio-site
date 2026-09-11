import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { contrastRatio } from './test-utils/color'

const css = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'index.css'),
  'utf8'
)

// Parsed from index.css rather than duplicated, so editing a colour there is
// what this test actually checks.
function readPalette(blockStart) {
  const block = css.slice(css.indexOf(blockStart))
  const body = block.slice(0, block.indexOf('}'))
  const palette = {}
  for (const [, name, values] of body.matchAll(
    /--([a-z-]+):\s*oklch\(([^)]+)\)/g
  )) {
    palette[name] = values.trim().split(/\s+/).map(Number)
  }
  return palette
}

const themes = {
  light: readPalette(':root {'),
  dark: readPalette('.dark {'),
}

const TEXT_ON_SURFACE = 4.5
const NON_TEXT = 3

const textPairs = []
for (const fg of ['body', 'heading', 'brand', 'brand-secondary']) {
  for (const bg of ['surface', 'surface-alt', 'surface-hover']) {
    textPairs.push([fg, bg])
  }
}

describe.each(Object.keys(themes))('%s theme', (name) => {
  const palette = themes[name]

  it('parsed every token it is about to assert on', () => {
    for (const token of [
      'surface',
      'surface-alt',
      'surface-hover',
      'body',
      'heading',
      'brand',
      'brand-secondary',
      'brand-contrast',
      'control-border',
    ]) {
      expect(palette[token], `missing --${token}`).toHaveLength(3)
    }
  })

  it.each(textPairs)('%s on %s meets AA for text', (fg, bg) => {
    expect(contrastRatio(palette[fg], palette[bg])).toBeGreaterThanOrEqual(
      TEXT_ON_SURFACE
    )
  })

  it('button label meets AA on the brand fill', () => {
    expect(
      contrastRatio(palette['brand-contrast'], palette.brand)
    ).toBeGreaterThanOrEqual(TEXT_ON_SURFACE)
  })

  // WCAG 1.4.11: the border is the only thing marking an input or outline
  // button, since the fill is barely distinguishable from the page.
  it.each(['surface', 'surface-alt'])(
    'control borders meet 3:1 on %s',
    (bg) => {
      expect(
        contrastRatio(palette['control-border'], palette[bg])
      ).toBeGreaterThanOrEqual(NON_TEXT)
    }
  )
})
