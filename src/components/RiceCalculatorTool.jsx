import { useState, useEffect } from 'react'

const STORAGE_KEY = 'rice-calculator-ideas'

const emptyIdea = {
  name: '',
  reach: '',
  impact: '',
  confidence: '',
  effort: '',
}

function computeScore({ reach, impact, confidence, effort }) {
  const r = parseFloat(reach)
  const i = parseFloat(impact)
  const c = parseFloat(confidence)
  const e = parseFloat(effort)
  if (!r || !i || !c || !e) return null
  return (r * i * (c / 100)) / e
}

function RiceCalculatorTool() {
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [draft, setDraft] = useState(emptyIdea)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
  }, [ideas])

  function handleAdd(event) {
    event.preventDefault()
    if (!draft.name.trim()) return
    setIdeas([...ideas, { ...draft, id: Date.now() }])
    setDraft(emptyIdea)
  }

  function handleRemove(id) {
    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  const sortedIdeas = [...ideas].sort(
    (a, b) => (computeScore(b) ?? -1) - (computeScore(a) ?? -1)
  )

  return (
    <div className="mt-8">
      <form onSubmit={handleAdd} className="mb-8">
        <div className="mb-4">
          <label
            htmlFor="idea-name"
            className="block text-sm font-medium text-heading mb-1"
          >
            Idea name
          </label>
          <input
            id="idea-name"
            type="text"
            placeholder="e.g. Dark mode toggle"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="w-full rounded-md border border-subtle bg-surface-alt px-3 py-2 text-heading placeholder:text-body focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label
              htmlFor="idea-reach"
              className="block text-sm font-medium text-heading mb-1"
            >
              Reach
            </label>
            <input
              id="idea-reach"
              type="number"
              placeholder="Users per quarter"
              value={draft.reach}
              onChange={(e) => setDraft({ ...draft, reach: e.target.value })}
              className="w-full rounded-md border border-subtle bg-surface-alt px-3 py-2 text-heading placeholder:text-body focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label
              htmlFor="idea-impact"
              className="block text-sm font-medium text-heading mb-1"
            >
              Impact
            </label>
            <input
              id="idea-impact"
              type="number"
              placeholder="1 to 3"
              value={draft.impact}
              onChange={(e) => setDraft({ ...draft, impact: e.target.value })}
              className="w-full rounded-md border border-subtle bg-surface-alt px-3 py-2 text-heading placeholder:text-body focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label
              htmlFor="idea-confidence"
              className="block text-sm font-medium text-heading mb-1"
            >
              Confidence
            </label>
            <input
              id="idea-confidence"
              type="number"
              placeholder="Percent"
              value={draft.confidence}
              onChange={(e) =>
                setDraft({ ...draft, confidence: e.target.value })
              }
              className="w-full rounded-md border border-subtle bg-surface-alt px-3 py-2 text-heading placeholder:text-body focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label
              htmlFor="idea-effort"
              className="block text-sm font-medium text-heading mb-1"
            >
              Effort
            </label>
            <input
              id="idea-effort"
              type="number"
              placeholder="Person-weeks"
              value={draft.effort}
              onChange={(e) => setDraft({ ...draft, effort: e.target.value })}
              className="w-full rounded-md border border-subtle bg-surface-alt px-3 py-2 text-heading placeholder:text-body focus:outline-none focus:ring-2 focus:ring-brand"
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
                <th className="py-2 pr-4">Idea</th>
                <th className="py-2 pr-4">Reach</th>
                <th className="py-2 pr-4">Impact</th>
                <th className="py-2 pr-4">Confidence</th>
                <th className="py-2 pr-4">Effort</th>
                <th className="py-2 pr-4">Score</th>
                <th className="py-2"></th>
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
                    <td className="py-2 pr-4 font-semibold text-brand">
                      {score !== null ? score.toFixed(1) : 'N/A'}
                    </td>
                    <td className="py-2">
                      <button
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
