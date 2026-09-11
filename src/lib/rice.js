// Reach and confidence may legitimately be 0, effort may not (division), and
// nothing may be negative. Returns null for anything unscoreable so the table
// shows "N/A" rather than a nonsense number.
//
// The form's min/max attributes stop bad values being entered; this guards the
// other way in, which is data restored from localStorage.
export function computeScore({ reach, impact, confidence, effort }) {
  const r = parseFloat(reach)
  const i = parseFloat(impact)
  const c = parseFloat(confidence)
  const e = parseFloat(effort)

  if ([r, i, c, e].some(Number.isNaN)) return null
  if (r < 0 || i <= 0 || c < 0 || c > 100 || e <= 0) return null

  return (r * i * (c / 100)) / e
}
