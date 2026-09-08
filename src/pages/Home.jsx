import { Link } from 'react-router-dom'

import Bio from '../components/Bio'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    slug: 'rice-calculator',
    title: 'RICE Prioritization Calculator',
    description:
      'A working RICE scoring tool for ranking competing feature ideas by reach, impact, confidence, and effort.',
  },
  {
    slug: 'package-health-checker',
    title: 'Package Health Checker',
    description:
      'Search any npm package for known vulnerabilities, severity, and advisory links in one lookup.',
  },
  {
    slug: 'phc-case-study',
    title: 'Case Study: Package Health Checker',
    description:
      'A written breakdown of the scoping decisions and trade-offs behind Package Health Checker.',
  },
]

function Home() {
  return (
    <>
      <Bio />
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/${project.slug}`}
            className="h-full block animate-fade-in-up"
            style={{ animationDelay: `${index * 100 + 150}ms` }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
            />
          </Link>
        ))}
      </section>
    </>
  )
}

export default Home
