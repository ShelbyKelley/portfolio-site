import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import RiceCalculatorTool from './RiceCalculatorTool'

const STORAGE_KEY = 'rice-calculator-ideas'

async function addIdea(user, { name, reach, impact, confidence, effort }) {
  await user.type(screen.getByLabelText(/idea name/i), name)
  if (reach) await user.type(screen.getByLabelText(/reach/i), reach)
  if (impact) await user.selectOptions(screen.getByLabelText(/impact/i), impact)
  if (confidence)
    await user.type(screen.getByLabelText(/confidence/i), confidence)
  if (effort) await user.type(screen.getByLabelText(/effort/i), effort)
  await user.click(screen.getByRole('button', { name: /add idea/i }))
}

function scoreCellFor(name) {
  const row = screen.getByText(name).closest('tr')
  return row.querySelectorAll('td')[5].textContent
}

describe('RiceCalculatorTool', () => {
  it('recovers from corrupt stored data instead of crashing', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json')
    render(<RiceCalculatorTool />)

    expect(screen.getByText(/add a few ideas above/i)).toBeInTheDocument()
  })

  it('ignores stored data of the wrong shape', () => {
    localStorage.setItem(STORAGE_KEY, '{"ideas":"wrong"}')
    render(<RiceCalculatorTool />)

    expect(screen.getByText(/add a few ideas above/i)).toBeInTheDocument()
  })

  it('still assigns unique ids without crypto.randomUUID', async () => {
    // Undefined outside secure contexts, e.g. a preview build over http.
    vi.stubGlobal('crypto', {})
    const user = userEvent.setup()
    render(<RiceCalculatorTool />)

    await addIdea(user, { name: 'first' })
    await addIdea(user, { name: 'second' })

    expect(screen.getByText('first')).toBeInTheDocument()
    expect(screen.getByText('second')).toBeInTheDocument()
  })

  it('scores a well-formed idea', async () => {
    const user = userEvent.setup()
    render(<RiceCalculatorTool />)

    await addIdea(user, {
      name: 'Dark mode',
      reach: '100',
      impact: '2',
      confidence: '80',
      effort: '2',
    })

    // (100 * 2 * 0.8) / 2
    expect(scoreCellFor('Dark mode')).toBe('80.0')
  })

  it('ranks higher scores first regardless of entry order', async () => {
    const user = userEvent.setup()
    render(<RiceCalculatorTool />)

    await addIdea(user, {
      name: 'Low',
      reach: '10',
      impact: '1',
      confidence: '50',
      effort: '5',
    })
    await addIdea(user, {
      name: 'High',
      reach: '500',
      impact: '3',
      confidence: '90',
      effort: '1',
    })

    const names = screen
      .getAllByRole('row')
      .slice(1)
      .map((row) => row.querySelector('td').textContent)
    expect(names).toEqual(['High', 'Low'])
  })

  it.each([
    ['effort below the minimum', 'effort', '-2'],
    ['confidence above the maximum', 'confidence', '500'],
    ['negative reach', 'reach', '-5'],
  ])('blocks submitting %s', async (_label, field, value) => {
    const user = userEvent.setup()
    render(<RiceCalculatorTool />)

    await user.type(screen.getByLabelText(/idea name/i), 'Blocked')
    await user.type(screen.getByLabelText(new RegExp(field, 'i')), value)
    await user.click(screen.getByRole('button', { name: /add idea/i }))

    // The browser refuses the submit, so nothing is added at all.
    expect(screen.queryByText('Blocked')).not.toBeInTheDocument()
    expect(screen.getByText(/add a few ideas above/i)).toBeInTheDocument()
  })

  it('shows N/A for invalid data restored from storage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'a',
          name: 'Legacy bad row',
          reach: '100',
          impact: '2',
          confidence: '80',
          effort: '-2',
        },
      ])
    )
    render(<RiceCalculatorTool />)

    expect(scoreCellFor('Legacy bad row')).toBe('N/A')
  })

  it('scores zero reach as zero, not N/A', async () => {
    const user = userEvent.setup()
    render(<RiceCalculatorTool />)

    await addIdea(user, {
      name: 'No reach',
      reach: '0',
      impact: '2',
      confidence: '80',
      effort: '2',
    })

    expect(scoreCellFor('No reach')).toBe('0.0')
  })

  it('constrains the numeric inputs in the browser', () => {
    render(<RiceCalculatorTool />)

    expect(screen.getByLabelText(/reach/i)).toHaveAttribute('min', '0')
    expect(screen.getByLabelText(/confidence/i)).toHaveAttribute('min', '0')
    expect(screen.getByLabelText(/confidence/i)).toHaveAttribute('max', '100')
    expect(screen.getByLabelText(/effort/i)).toHaveAttribute('min', '0.5')
  })

  it('ignores an empty idea name', async () => {
    const user = userEvent.setup()
    render(<RiceCalculatorTool />)

    await user.click(screen.getByRole('button', { name: /add idea/i }))

    expect(screen.getByText(/add a few ideas above/i)).toBeInTheDocument()
  })

  it('removes an idea and persists the change', async () => {
    const user = userEvent.setup()
    render(<RiceCalculatorTool />)

    await addIdea(user, { name: 'Temporary' })
    expect(screen.getByText('Temporary')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove temporary/i }))

    expect(screen.queryByText('Temporary')).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY))).toEqual([])
  })

  it('reloads ideas from storage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'a',
          name: 'Saved idea',
          reach: '10',
          impact: '2',
          confidence: '50',
          effort: '1',
        },
      ])
    )
    render(<RiceCalculatorTool />)

    expect(screen.getByText('Saved idea')).toBeInTheDocument()
    expect(scoreCellFor('Saved idea')).toBe('10.0')
  })
})
