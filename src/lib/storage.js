// localStorage throws in some privacy modes and can hold corrupt JSON.
// Nothing stored here is worth breaking a page over, so reads fall back.

export function readStoredString(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStoredString(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Value won't persist.
  }
}

export function readStoredJson(key, fallback) {
  const raw = readStoredString(key)
  if (raw === null) return fallback

  try {
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    // Corrupt entry, drop it.
    return fallback
  }
}

export function writeStoredJson(key, value) {
  try {
    writeStoredString(key, JSON.stringify(value))
  } catch {
    // Not serializable.
  }
}
