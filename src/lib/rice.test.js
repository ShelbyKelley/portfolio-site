import { describe, expect, it } from 'vitest'

import { computeScore } from './rice'

const valid = { reach: '100', impact: '2', confidence: '80', effort: '2' }

describe('computeScore', () => {
  it('applies the RICE formula', () => {
    // (100 reach * 2 impact * 0.8 confidence) / 2 effort
    expect(computeScore(valid)).toBe(80)
  })

  it.each([
    ['half confidence halves the score', { confidence: '40' }, 40],
    ['double effort halves the score', { effort: '4' }, 40],
    ['double reach doubles the score', { reach: '200' }, 160],
    ['minimal impact scales down', { impact: '0.25' }, 10],
    ['zero reach scores zero', { reach: '0' }, 0],
    ['zero confidence scores zero', { confidence: '0' }, 0],
    ['full confidence', { confidence: '100' }, 100],
  ])('%s', (_label, override, expected) => {
    expect(computeScore({ ...valid, ...override })).toBe(expected)
  })

  it.each([
    ['negative effort', { effort: '-2' }],
    ['zero effort', { effort: '0' }],
    ['negative reach', { reach: '-5' }],
    ['negative confidence', { confidence: '-10' }],
    ['confidence above 100', { confidence: '500' }],
    ['zero impact', { impact: '0' }],
    ['negative impact', { impact: '-2' }],
    ['empty reach', { reach: '' }],
    ['empty effort', { effort: '' }],
    ['non-numeric reach', { reach: 'abc' }],
    ['undefined effort', { effort: undefined }],
  ])('returns null for %s', (_label, override) => {
    expect(computeScore({ ...valid, ...override })).toBeNull()
  })

  it('never returns a negative score for accepted input', () => {
    for (const reach of ['0', '1', '1000']) {
      for (const confidence of ['0', '50', '100']) {
        for (const effort of ['0.5', '1', '40']) {
          const score = computeScore({ ...valid, reach, confidence, effort })
          expect(score).toBeGreaterThanOrEqual(0)
        }
      }
    }
  })
})
