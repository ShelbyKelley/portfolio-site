const skills = [
  'Angular 2+',
  'JavaScript / TypeScript',
  'Java',
  'Python',
  'Secure Coding Practices',
  'Git',
  'SDLC',
  'CI/CD',
  'Agile Methodologies',
  'Legacy System Modernization',
  'Reverse Engineering',
  'Mentorship & Cross-Team Collaboration',
]

const experience = [
  {
    company: 'HeroDevs',
    location: 'Remote',
    title: 'Senior Software Engineer',
    dates: 'June 2022 to Present',
    bullets: [
      'Provide long-term support for deprecated open-source packages by maintaining compatibility, applying security patches, and publishing CVEs for discovered vulnerabilities.',
      'Conduct in-depth research on legacy systems to diagnose issues, ensure stability, and deliver reliable security updates for enterprise use.',
      'Led enterprise-scale migrations of legacy web applications, working closely with client teams to break down legacy complexity and drive sustainable architecture.',
    ],
  },
  {
    company: 'Camp Bow Wow',
    location: 'Broomfield, CO',
    title: 'Lead Software Engineer',
    dates: 'June 2021 to June 2022',
    bullets: [
      'Led the development of a custom invoicing system, working across the Angular-based frontend and the PHP backend to deliver a seamless and reliable billing experience.',
      'Mentored junior engineers and elevated engineering quality across the team through best practices and collaborative development.',
    ],
  },
  {
    company: 'Sila Solutions Group',
    location: 'Shelton, CT',
    title: 'Software Engineer',
    dates: 'June 2018 to June 2021',
    bullets: [
      'Led front-end development of Angular-based web apps and contributed to full-stack architecture for enterprise and mobile applications.',
      'Worked as the primary developer interfacing with stakeholders and SMEs to clarify requirements, translate them into actionable tasks, and execute within an agile workflow.',
    ],
  },
  {
    company: 'Optum (UnitedHealth Group)',
    location: 'Boston, MA',
    title: 'Software Engineer Intern',
    dates: 'June 2017 to August 2017',
    bullets: [
      'Collaborated with an agile team of interns to develop an internal web tool to anonymize PHI/PII for secure data testing.',
      'Presented the tool and received executive approval to be implemented enterprise-wide.',
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
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h2 className="text-body">Senior Software Engineer</h2>
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

      <section className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-heading mb-3 pb-2 border-b border-subtle">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-subtle bg-surface-alt px-3 py-1 text-sm text-body"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-heading mb-4 pb-2 border-b border-subtle">
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
        <h2 className="font-heading text-xl font-semibold text-heading mb-4 pb-2 border-b border-subtle">
          Education
        </h2>
        <div className="space-y-3">
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
      </section>
    </div>
  )
}

export default Resume
