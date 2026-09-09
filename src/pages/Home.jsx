import { Link } from 'react-router-dom'

import Reveal from '../components/Reveal'

const facts = [
  '8 years in software development',
  '5 years leading engineering teams',
  'CSM certified',
  'B.S. Computer Science, B.A. Anthropology',
]

function Home() {
  return (
    <>
      <Reveal index={0}>
        <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-brand-secondary mb-7">
          Technical Product / Program Manager
        </p>
      </Reveal>

      <Reveal
        as="h1"
        index={1}
        className="font-heading font-light text-[clamp(44px,8.4vw,92px)] leading-[1.02] tracking-[-0.022em] text-heading max-w-[22ch] text-pretty"
      >
        I turn ambiguous requirements into work that{' '}
        <em className="text-brand">ships</em>.
      </Reveal>

      <Reveal
        index={2}
        className="grid gap-[clamp(20px,4vw,56px)] mt-[clamp(40px,7vh,72px)] mb-10"
        style={{
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          maxWidth: '860px',
        }}
      >
        <p className="text-body leading-relaxed max-w-[42ch]">
          Eight years in software development, five leading engineering teams. I
          pair technical fluency with real program management, not process for
          its own sake.
        </p>
        <p className="text-body leading-relaxed max-w-[42ch]">
          I&rsquo;ve been both the working engineer and the team lead, so I know
          how to translate ambiguous asks into scoped, shippable work without
          losing the technical thread.
        </p>
      </Reveal>

      <ul className="flex flex-wrap gap-2 mb-8">
        {facts.map((fact) => (
          <li
            key={fact}
            className="rounded-full border border-subtle px-3 py-1 font-mono text-xs text-body"
          >
            {fact}
          </li>
        ))}
      </ul>

      <Link
        to="/projects"
        className="inline-block rounded-full bg-brand px-5 py-2.5 font-mono text-[13px] no-underline text-brand-contrast hover:opacity-90 transition-opacity mb-20"
      >
        view my projects →
      </Link>

      <section className="pt-10 border-t border-subtle mb-[clamp(56px,10vh,104px)]">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
          Case study
        </p>
        <h2 className="font-heading font-light text-[clamp(28px,3.6vw,40px)] leading-[1.1] tracking-[-0.015em] text-heading mb-4">
          Leading under a hard deadline
        </h2>
        <div className="text-body leading-relaxed space-y-4 max-w-2xl">
          <p>
            At HeroDevs, I led a{' '}
            <strong className="text-heading font-medium">
              three-person team
            </strong>{' '}
            through a{' '}
            <strong className="text-heading font-medium">
              three-month deadline
            </strong>{' '}
            to finish a partial system migration for a client in Denmark.
          </p>
          <p>
            I set up a kanban board to divide the work and ran daily standups to
            keep the team on track. Weekly client demos kept us aligned and let
            us coordinate shared components with a parallel team working the
            same codebase.
          </p>
          <p>
            I served as both{' '}
            <strong className="text-heading font-medium">team lead</strong> and
            a working developer, splitting work across the team and running
            informal lunch-and-learns to close skill gaps as they came up.
          </p>
          <p>
            We{' '}
            <strong className="text-heading font-medium">
              hit the deadline
            </strong>
            , and the client stayed on for further work with HeroDevs.
          </p>
        </div>
      </section>

      <section className="pt-[clamp(40px,7vh,72px)] border-t border-subtle pb-[clamp(72px,12vh,120px)]">
        <div
          className="grid gap-[clamp(20px,4vw,56px)] items-end"
          style={{
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          }}
        >
          <h2 className="font-heading font-light text-[clamp(32px,5vw,52px)] leading-[1.08] tracking-[-0.02em] text-heading max-w-[20ch]">
            Hiring? Send me the hardest problem you have
            <span className="text-brand animate-blink">.</span>
          </h2>
          <div className="flex flex-col gap-3 font-mono text-[15px]">
            <a
              href="mailto:shelbya.kelley@gmail.com"
              className="text-brand no-underline hover:text-brand-secondary transition-colors w-fit"
            >
              shelbya.kelley@gmail.com
            </a>
            <a
              href="https://github.com/ShelbyKelley"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand no-underline hover:text-brand-secondary transition-colors w-fit"
            >
              github.com/ShelbyKelley
            </a>
            <a
              href="https://www.linkedin.com/in/shelbyakelley/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand no-underline hover:text-brand-secondary transition-colors w-fit"
            >
              linkedin.com/in/shelbyakelley
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
