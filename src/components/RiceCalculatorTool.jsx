import { useState, useEffect } from 'react'

import { computeScore } from '../lib/rice'
import { readStoredJson, writeStoredJson } from '../lib/storage'

const STORAGE_KEY = 'rice-calculator-ideas'

const emptyIdea = {
  name: '',
  reach: '',
  impact: '2',
  confidence: '',
  effort: '',
}

const impactOptions = [
  { value: '3', label: '3 (Massive)' },
  { value: '2', label: '2 (High)' },
  { value: '1', label: '1 (Medium)' },
  { value: '0.5', label: '0.5 (Low)' },
  { value: '0.25', label: '0.25 (Minimal)' },
]

// randomUUID, not Date.now(): two ideas added in the same millisecond would
// share an id and duplicate React keys. It is missing outside secure contexts
// (http on a LAN address, say), so fall back rather than throw.
let idCounter = 0
function newId() {
  return crypto.randomUUID?.() ?? `idea-${Date.now()}-${idCounter++}`
}

function RiceCalculatorTool() {
  const [ideas, setIdeas] = useState(() => {
    const saved = readStoredJson(STORAGE_KEY, [])
    // Guard against a hand-edited entry.
    return Array.isArray(saved) ? saved : []
  })
  const [draft, setDraft] = useState(emptyIdea)

  useEffect(() => {
    writeStoredJson(STORAGE_KEY, ideas)
  }, [ideas])

  function handleAdd(event) {
    event.preventDefault()
    if (!draft.name.trim()) return
    setIdeas((previous) => [...previous, { ...draft, id: newId() }])
    setDraft(emptyIdea)
  }

  function handleRemove(id) {
    setIdeas((previous) => previous.filter((idea) => idea.id !== id))
  }

  const sortedIdeas = [...ideas].sort(
    (a, b) => (computeScore(b) ?? -1) - (computeScore(a) ?? -1)
  )

  const selectClass =
    'w-full rounded-md border border-control-border bg-surface-alt px-3 py-2 text-heading focus:outline-none focus:ring-2 focus:ring-brand'
  const inputClass =
    'w-full rounded-md border border-control-border bg-surface-alt px-3 py-2 text-heading placeholder:text-body focus:outline-none focus:ring-2 focus:ring-brand'
  const labelClass = 'block text-sm font-medium text-heading mb-1'

  return (
    <div>
      <form onSubmit={handleAdd} className="mb-8">
        <div className="mb-4">
          <label htmlFor="idea-name" className={labelClass}>
            Idea name
          </label>
          <input
            id="idea-name"
            type="text"
            placeholder="e.g. Dark mode toggle"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label htmlFor="idea-reach" className={labelClass}>
              Reach (users/quarter)
            </label>
            <input
              id="idea-reach"
              type="number"
              min="0"
              step="any"
              value={draft.reach}
              onChange={(e) => setDraft({ ...draft, reach: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="idea-impact" className={labelClass}>
              Impact
            </label>
            <select
              id="idea-impact"
              value={draft.impact}
              onChange={(e) => setDraft({ ...draft, impact: e.target.value })}
              className={selectClass}
            >
              {impactOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="idea-confidence" className={labelClass}>
              Confidence (%)
            </label>
            <input
              id="idea-confidence"
              type="number"
              min="0"
              max="100"
              step="any"
              value={draft.confidence}
              onChange={(e) =>
                setDraft({ ...draft, confidence: e.target.value })
              }
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="idea-effort" className={labelClass}>
              Effort (weeks)
            </label>
            <input
              id="idea-effort"
              type="number"
              min="0.5"
              step="any"
              value={draft.effort}
              onChange={(e) => setDraft({ ...draft, effort: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md bg-brand px-5 py-2 text-brand-contrast font-medium hover:opacity-90 transition-opacity"
        >
          Add idea
        </button>
      </form>

      {sortedIdeas.length === 0 ? (
        <p className="text-body">
          Add a few ideas above to see them ranked by RICE score.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-subtle text-sm text-body">
                <th scope="col" className="py-2 pr-4">
                  Idea
                </th>
                <th scope="col" className="py-2 pr-4">
                  Reach
                </th>
                <th scope="col" className="py-2 pr-4">
                  Impact
                </th>
                <th scope="col" className="py-2 pr-4">
                  Confidence
                </th>
                <th scope="col" className="py-2 pr-4">
                  Effort
                </th>
                <th scope="col" className="py-2 pr-4">
                  Score
                </th>
                <th scope="col" className="py-2">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedIdeas.map((idea) => {
                const score = computeScore(idea)
                return (
                  <tr
                    key={idea.id}
                    className="border-b border-subtle text-heading"
                  >
                    <td className="py-2 pr-4 font-medium">{idea.name}</td>
                    <td className="py-2 pr-4">{idea.reach}</td>
                    <td className="py-2 pr-4">{idea.impact}</td>
                    <td className="py-2 pr-4">{idea.confidence}%</td>
                    <td className="py-2 pr-4">{idea.effort}</td>
                    <td className="py-2 pr-4 font-bold text-brand">
                      {score !== null ? score.toFixed(1) : 'N/A'}
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => handleRemove(idea.id)}
                        aria-label={`Remove ${idea.name}`}
                        className="text-sm text-body hover:text-brand transition-colors"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RiceCalculatorTool
