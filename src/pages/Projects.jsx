import { Link } from 'react-router-dom'

import Reveal from '../components/Reveal'

const projects = [
  {
    eyebrow: '01 · Tool',
    title: 'Package Health Checker',
    description:
      'Search any npm package for known vulnerabilities, severity, and advisory links in one lookup.',
    pills: ['React', 'FastAPI', 'AWS Lambda', 'OSV.dev'],
    links: [
      { label: 'open tool', to: '/package-health-checker' },
      {
        label: 'view source',
        href: 'https://github.com/ShelbyKelley/package-health-checker',
      },
    ],
  },
  {
    eyebrow: '02 · Tool',
    title: 'RICE Prioritization Calculator',
    description:
      'A working RICE scoring tool for ranking competing feature ideas by reach, impact, confidence, and effort.',
    formula: 'Score = R × I × C / E',
    links: [
      { label: 'open tool', to: '/rice-calculator' },
      {
        label: 'view source',
        href: 'https://github.com/ShelbyKelley/portfolio-site/blob/main/src/components/RiceCalculatorTool.jsx',
      },
    ],
  },
  {
    eyebrow: '03 · Case study',
    title: 'Case Study: Package Health Checker',
    description:
      'A written breakdown of the scoping decisions and trade-offs behind Package Health Checker.',
    pills: [
      'Problem',
      'Scope decisions',
      'Risk and security posture',
      "What I'd prioritize next",
    ],
    links: [{ label: 'read case study', to: '/phc-case-study' }],
  },
]

function ProjectLink({ link }) {
  if (link.href) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full bg-brand px-3.5 py-1 font-mono text-xs no-underline text-brand-contrast hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        {link.label} ↗
      </a>
    )
  }

  return (
    <Link
      to={link.to}
      className="font-mono text-[13px] text-body no-underline border-b border-subtle pb-0.5 hover:text-brand hover:border-brand transition-colors"
    >
      {link.label}
    </Link>
  )
}

function Projects() {
  return (
    <div>
      <div className="flex items-baseline justify-between pb-3.5 mb-2 border-b border-subtle">
        <h1 className="font-mono text-[13px] uppercase tracking-[0.16em] text-body">
          Selected work
        </h1>
        <span className="font-mono text-[13px] text-body">
          {String(projects.length).padStart(2, '0')}
        </span>
      </div>

      {projects.map((project, index) => (
        <Reveal
          key={project.title}
          as="article"
          index={index}
          className="grid gap-[clamp(20px,4vw,56px)] py-[clamp(36px,6vh,60px)] border-b border-subtle"
          style={{
            gridTemplateColumns:
              'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          }}
        >
          <div>
            <p className="font-mono text-xs text-brand-secondary mb-2">
              {project.eyebrow}
            </p>
            <h3 className="font-heading font-light text-[clamp(28px,3.6vw,40px)] leading-[1.1] tracking-[-0.015em] text-heading">
              {project.title}
            </h3>
          </div>

          <div>
            <p className="text-body leading-relaxed max-w-[46ch] mb-4">
              {project.description}
            </p>

            {project.pills && (
              <ul className="flex flex-wrap gap-2 mb-4">
                {project.pills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full border border-subtle px-2.5 py-1 font-mono text-xs text-body"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            )}

            {project.formula && (
              <div className="border border-subtle bg-surface-alt rounded-md px-4.5 py-4 mb-4 overflow-x-auto">
                <code className="font-mono text-[13px] text-brand-secondary whitespace-pre">
                  {project.formula}
                </code>
              </div>
            )}

            <div className="flex flex-wrap gap-5">
              {project.links.map((link) => (
                <ProjectLink key={link.label} link={link} />
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default Projects
