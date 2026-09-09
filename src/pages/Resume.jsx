import Reveal from '../components/Reveal'

const competencies = [
  'Technical Program Management',
  'Cross-Functional Team Leadership',
  'Agile & Scrum (CSM)',
  'Stakeholder Management',
  'Client & Vendor Communication',
  'Risk Management',
  'Requirements Gathering',
  'Roadmap Planning & Prioritization',
  'SDLC',
  'CI/CD',
  'Security & Compliance',
  'Mentorship & Team Development',
]

const experience = [
  {
    company: 'HeroDevs',
    location: 'Remote',
    title: 'Senior Software Engineer',
    dates: 'June 2022 to Present',
    bullets: [
      'Led a 3-person cross-functional team through a fixed 3-month deadline for an international client migration, using kanban-based sprint planning, daily standups, and weekly stakeholder demos to align scope and manage risk.',
      'Coordinated shared-component dependencies with a parallel engineering team working the same codebase, resolving cross-team conflicts through structured client communication. Delivered on time, and the client retained the company for further engagements.',
      'Independently own prioritization and delivery of security research and remediation work, publishing CVEs and applying patches under recurring deadline pressure with no formal PM support.',
      'Partner directly with enterprise clients to scope and de-risk legacy system migrations, translating technical complexity into clear stakeholder communication.',
    ],
  },
  {
    company: 'Camp Bow Wow',
    location: 'Broomfield, CO',
    title: 'Lead Software Engineer',
    dates: 'June 2021 to June 2022',
    bullets: [
      'Led end-to-end delivery of a custom invoicing system spanning frontend and backend, managing scope, technical risk, and timeline as both project lead and contributing engineer.',
      'Built team capability through structured mentorship, elevating engineering quality and reducing onboarding friction for junior engineers.',
    ],
  },
  {
    company: 'Sila Solutions Group',
    location: 'Shelton, CT',
    title: 'Software Engineer',
    dates: 'June 2018 to June 2021',
    bullets: [
      'Served as primary point of contact between engineering and business stakeholders, translating ambiguous requirements into actionable, prioritized work within an Agile workflow.',
      'Led front-end delivery and contributed to full-stack architecture decisions across enterprise and mobile product lines.',
    ],
  },
  {
    company: 'Optum (UnitedHealth Group)',
    location: 'Boston, MA',
    title: 'Software Engineer Intern',
    dates: 'June 2017 to August 2017',
    bullets: [
      'Identified a gap in secure data-testing workflows, built a PHI/PII anonymization tool, and pitched it directly to leadership, securing executive approval for enterprise-wide rollout.',
    ],
  },
]

const education = [
  {
    school: 'Central Connecticut State University',
    degree: 'B.S. Computer Science',
    dates: 'August 2015 to May 2018',
  },
  {
    school: 'Central Connecticut State University',
    degree: 'B.A. Anthropology',
    dates: 'August 2008 to May 2012',
  },
]

function Resume() {
  return (
    <div>
      <Reveal index={0} className="mb-10">
        <h1 className="font-heading font-light text-4xl text-heading mb-1">
          Shelby Kelley
        </h1>
        <p className="font-mono text-[13px] uppercase tracking-widest text-brand-secondary mb-2">
          Technical Product / Program Manager
        </p>
        <p className="font-mono text-[13px] text-body">
          <a
            href="mailto:shelbya.kelley@gmail.com"
            className="text-body no-underline hover:text-brand transition-colors"
          >
            shelbya.kelley@gmail.com
          </a>
          {' · '}
          <a
            href="https://www.linkedin.com/in/shelbyakelley/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body no-underline hover:text-brand transition-colors"
          >
            LinkedIn
          </a>
          {' · '}
          <a
            href="https://github.com/ShelbyKelley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body no-underline hover:text-brand transition-colors"
          >
            GitHub
          </a>
        </p>
      </Reveal>

      <div className="flex items-baseline justify-between pb-3.5 mb-8 border-b border-subtle">
        <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-body">
          Curriculum vitae
        </span>
        <a
          href="/resume.pdf"
          download
          className="font-mono text-[13px] text-body no-underline border-b border-subtle pb-0.5 hover:text-brand hover:border-brand transition-colors"
        >
          download pdf
        </a>
      </div>

      <div
        className="grid gap-[clamp(28px,5vw,64px)]"
        style={{
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        }}
      >
        <Reveal index={1} as="section" className="space-y-6.5">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-2.5">
              Summary
            </h2>
            <p className="text-body text-[17px] leading-relaxed max-w-[40ch]">
              Technical Product/Program Manager with{' '}
              <strong className="text-heading font-medium">8 years</strong> in
              software development, including{' '}
              <strong className="text-heading font-medium">
                5 years leading engineering teams
              </strong>
              . Combines hands-on technical fluency with program management
              practice, including Agile/Scrum facilitation, stakeholder
              communication, cross-team dependency coordination, and risk
              management, to turn ambiguous requirements into shipped outcomes.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-2.5">
              Core Competencies
            </h2>
            <ul className="flex flex-wrap gap-2">
              {competencies.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-subtle px-3 py-1 font-mono text-xs text-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-2.5">
              Education
            </h2>
            <div className="space-y-2 mb-3">
              {education.map((item) => (
                <div key={item.school + item.degree}>
                  <h3 className="text-heading text-[17px]">
                    {item.degree}, {item.school}
                  </h3>
                  <span className="font-mono text-xs text-body">
                    {item.dates}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-body text-[17px]">
              Certified ScrumMaster (CSM), 2022
            </p>
          </div>
        </Reveal>

        <Reveal index={2} as="section">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-4">
            Experience
          </h2>
          <div className="space-y-6.5">
            {experience.map((job) => (
              <div
                key={job.company + job.title}
                className="grid gap-4.5"
                style={{ gridTemplateColumns: '96px 1fr' }}
              >
                <span className="font-mono text-xs text-body pt-1.5">
                  {job.dates}
                </span>
                <div>
                  <h3 className="font-heading text-[21px] text-heading">
                    {job.title}, {job.company}
                  </h3>
                  <p className="font-mono text-xs text-body mb-2">
                    {job.location}
                  </p>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-body text-[17px] leading-relaxed">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default Resume
