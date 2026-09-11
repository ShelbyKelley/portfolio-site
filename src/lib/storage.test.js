import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  readStoredJson,
  readStoredString,
  writeStoredJson,
  writeStoredString,
} from './storage'

function breakStorage(method) {
  const original = Storage.prototype[method]
  Storage.prototype[method] = () => {
    throw new Error('blocked')
  }
  return () => {
    Storage.prototype[method] = original
  }
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('strings', () => {
  it('round-trips a value', () => {
    writeStoredString('k', 'v')
    expect(readStoredString('k')).toBe('v')
  })

  it('returns null for a missing key', () => {
    expect(readStoredString('nope')).toBeNull()
  })

  it('returns null when reading throws', () => {
    const restore = breakStorage('getItem')
    try {
      expect(readStoredString('k')).toBeNull()
    } finally {
      restore()
    }
  })

  it('does not throw when writing throws', () => {
    const restore = breakStorage('setItem')
    try {
      expect(() => writeStoredString('k', 'v')).not.toThrow()
    } finally {
      restore()
    }
  })
})

describe('json', () => {
  it('round-trips an object', () => {
    writeStoredJson('k', { a: [1, 2] })
    expect(readStoredJson('k', null)).toEqual({ a: [1, 2] })
  })

  it('falls back for a missing key', () => {
    expect(readStoredJson('nope', 'fallback')).toBe('fallback')
  })

  it('falls back for corrupt JSON rather than throwing', () => {
    localStorage.setItem('k', '{broken')
    expect(readStoredJson('k', 'fallback')).toBe('fallback')
  })

  it('falls back for a stored null', () => {
    localStorage.setItem('k', 'null')
    expect(readStoredJson('k', 'fallback')).toBe('fallback')
  })

  it('preserves falsy values that are not null', () => {
    writeStoredJson('zero', 0)
    writeStoredJson('no', false)
    expect(readStoredJson('zero', 'fallback')).toBe(0)
    expect(readStoredJson('no', 'fallback')).toBe(false)
  })

  it('does not throw on a circular value', () => {
    const circular = {}
    circular.self = circular
    expect(() => writeStoredJson('k', circular)).not.toThrow()
  })
})
