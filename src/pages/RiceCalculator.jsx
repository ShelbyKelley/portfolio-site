import { Link } from 'react-router-dom'

import RiceCalculatorTool from '../components/RiceCalculatorTool'

function RiceCalculator() {
  return (
    <div className="animate-fade-in-up">
      <Link
        to="/projects"
        className="inline-block mb-6 text-sm text-body hover:text-brand transition-colors"
      >
        ← Back to projects
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <h1 className="font-heading text-3xl font-bold text-brand">
          RICE Prioritization Calculator
        </h1>
        <a
          href="https://github.com/ShelbyKelley/portfolio-site/blob/main/src/components/RiceCalculatorTool.jsx"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-brand px-5 py-2 text-brand-contrast font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          View source on GitHub ↗
        </a>
      </div>

      <p className="text-body leading-relaxed mb-8 max-w-2xl">
        Add a few competing ideas below and this tool ranks them by{' '}
        <strong className="text-heading">RICE score</strong>, a framework for
        prioritizing by expected value instead of gut feeling.
      </p>

      <RiceCalculatorTool />

      <section className="mt-16 pt-10 border-t border-subtle max-w-2xl">
        <h2 className="font-heading text-2xl font-semibold text-brand-secondary mb-4">
          Understanding RICE
        </h2>

        <div className="rounded-md border border-subtle bg-surface-alt px-6 py-5 mb-6">
          <div className="flex justify-center items-center gap-2 font-heading text-xl sm:text-2xl text-heading">
            <span>Score =</span>
            <span className="flex flex-col items-center">
              <span className="border-b-2 border-heading px-2 pb-1">
                R × I × C
              </span>
              <span className="pt-1">E</span>
            </span>
          </div>
          <p className="text-sm text-body mt-3 text-center">
            Reach × Impact × Confidence, divided by Effort
          </p>
        </div>

        <p className="text-body leading-relaxed mb-6">
          A <strong className="text-heading">higher score</strong> means a
          stronger case for prioritizing that idea now. The score is only as
          good as the estimates behind it, so treat it as a starting point for
          discussion, not a final answer.
        </p>

        <div className="text-body leading-relaxed space-y-4 mb-6">
          <p>
            <strong className="text-heading">Reach</strong>: how many people or
            customers this affects in a given period, for example per quarter. A
            higher number means more people touched.
          </p>
          <p>
            <strong className="text-heading">Impact</strong>: how much this
            moves the needle for each person it reaches, on the standard 3
            (massive) to 0.25 (minimal) scale.
          </p>
          <p>
            <strong className="text-heading">Confidence</strong>: how sure you
            are about your Reach and Impact estimates. Use 100% when you have
            solid data behind an estimate, and lower it when you are mostly
            guessing.
          </p>
          <p>
            <strong className="text-heading">Effort</strong>: the estimated cost
            to build it, in person-weeks. A larger number pulls the score down,
            since bigger efforts need a stronger case to justify.
          </p>
        </div>

        <p className="text-body leading-relaxed">
          Add every idea you are weighing, even rough ones. The ranked table
          above shows where to focus first given your current estimates. A low
          confidence score today is a reason to go find better data, not a
          reason to ignore the idea.
        </p>
      </section>
    </div>
  )
}

export default RiceCalculator
