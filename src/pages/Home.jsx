import { Link } from 'react-router-dom'

import Bio from '../components/Bio'

const facts = [
  '8 years in software development',
  '5 years leading engineering teams',
  'CSM certified',
  'B.S. Computer Science, B.A. Anthropology',
]

function Home() {
  return (
    <>
      <Bio />

      <ul className="flex flex-wrap gap-2 mb-6">
        {facts.map((fact) => (
          <li
            key={fact}
            className="rounded-full border border-subtle bg-surface-alt px-3 py-1 text-sm text-body"
          >
            {fact}
          </li>
        ))}
      </ul>

      <Link
        to="/projects"
        className="inline-block rounded-md bg-brand px-5 py-2 text-brand-contrast font-medium hover:opacity-90 transition-opacity mb-16"
      >
        View my projects →
      </Link>

      <section className="pt-10 border-t border-subtle">
        <h2 className="font-heading text-2xl font-semibold text-brand-secondary mb-4">
          Leading under a hard deadline
        </h2>
        <div className="text-body leading-relaxed space-y-4 max-w-2xl">
          <p>
            At HeroDevs, I led a{' '}
            <strong className="text-heading">three-person team</strong> through
            a <strong className="text-heading">three-month deadline</strong> to
            finish a partial system migration for a client in Denmark.
          </p>
          <p>
            I set up a kanban board to divide the work and ran daily standups to
            keep the team on track. Weekly client demos kept us aligned and let
            us coordinate shared components with a parallel team working the
            same codebase.
          </p>
          <p>
            I served as both <strong className="text-heading">team lead</strong>{' '}
            and a working developer, splitting work across the team and running
            informal lunch-and-learns to close skill gaps as they came up.
          </p>
          <p>
            We <strong className="text-heading">hit the deadline</strong>, and
            the client stayed on for further work with HeroDevs.
          </p>
        </div>
      </section>
    </>
  )
}

export default Home
