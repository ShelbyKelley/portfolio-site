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
    <div className="animate-fade-in-up max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand mb-1">
            Shelby Kelley
          </h1>
          <p className="font-semibold text-heading">
            Technical Product / Program Manager
          </p>
          <p className="text-sm text-body mt-1">
            <a
              href="mailto:shelbya.kelley@gmail.com"
              className="hover:text-brand transition-colors"
            >
              shelbya.kelley@gmail.com
            </a>
            {' · '}
            <a
              href="https://www.linkedin.com/in/shelbyakelley/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors"
            >
              LinkedIn
            </a>
            {' · '}
            <a
              href="https://github.com/ShelbyKelley"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand transition-colors"
            >
              GitHub
            </a>
          </p>
        </div>
        <a
          href="/resume.pdf"
          download
          className="inline-block rounded-md bg-brand px-5 py-2 text-brand-contrast font-medium hover:opacity-90 transition-opacity"
        >
          Download PDF
        </a>
      </div>

      <section className="mt-8 mb-8">
        <h2 className="font-heading text-xl font-semibold text-brand-secondary mb-3 pb-2 border-b border-subtle">
          Summary
        </h2>
        <p className="text-body leading-relaxed">
          Technical Product/Program Manager with{' '}
          <strong className="text-heading">8 years</strong> in software
          development, including{' '}
          <strong className="text-heading">
            5 years leading engineering teams
          </strong>
          . Combines hands-on technical fluency with program management
          practice, including Agile/Scrum facilitation, stakeholder
          communication, cross-team dependency coordination, and risk
          management, to turn ambiguous requirements into shipped outcomes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-brand-secondary mb-3 pb-2 border-b border-subtle">
          Core Competencies
        </h2>
        <ul className="flex flex-wrap gap-2">
          {competencies.map((item) => (
            <li
              key={item}
              className="rounded-full border border-subtle bg-surface-alt px-3 py-1 text-sm text-body"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-brand-secondary mb-4 pb-2 border-b border-subtle">
          Experience
        </h2>
        <div className="space-y-6">
          {experience.map((job) => (
            <div key={job.company + job.title}>
              <div className="flex items-baseline justify-between flex-wrap gap-x-4">
                <h3 className="font-medium text-heading">
                  {job.title}, {job.company}
                </h3>
                <span className="text-sm text-body">{job.dates}</span>
              </div>
              <p className="text-sm text-body mb-2">{job.location}</p>
              <ul className="list-disc list-outside pl-5 space-y-1 text-body">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-brand-secondary mb-4 pb-2 border-b border-subtle">
          Education
        </h2>
        <div className="space-y-3 mb-3">
          {education.map((item) => (
            <div
              key={item.school + item.degree}
              className="flex items-baseline justify-between flex-wrap gap-x-4"
            >
              <h3 className="font-medium text-heading">
                {item.degree}, {item.school}
              </h3>
              <span className="text-sm text-body">{item.dates}</span>
            </div>
          ))}
        </div>
        <p className="text-body">Certified ScrumMaster (CSM), 2022</p>
      </section>
    </div>
  )
}

export default Resume
