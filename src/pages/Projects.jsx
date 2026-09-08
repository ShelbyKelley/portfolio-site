import { Link } from 'react-router-dom'

import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    slug: 'package-health-checker',
    title: 'Package Health Checker',
    description:
      'Search any npm package for known vulnerabilities, severity, and advisory links in one lookup.',
  },
  {
    slug: 'rice-calculator',
    title: 'RICE Prioritization Calculator',
    description:
      'A working RICE scoring tool for ranking competing feature ideas by reach, impact, confidence, and effort.',
  },
  {
    slug: 'phc-case-study',
    title: 'Case Study: Package Health Checker',
    description:
      'A written breakdown of the scoping decisions and trade-offs behind Package Health Checker.',
  },
]

function Projects() {
  return (
    <div className="animate-fade-in-up">
      <h1 className="font-heading text-3xl font-bold text-brand mb-6">
        Projects
      </h1>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/${project.slug}`}
            className="h-full block animate-fade-in-up"
            style={{ animationDelay: `${index * 80 + 100}ms` }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
            />
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Projects
