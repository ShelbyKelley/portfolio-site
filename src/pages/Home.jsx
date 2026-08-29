import { Link } from 'react-router-dom'

import Bio from '../components/Bio'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    slug: 'retro-rewind',
    title: 'Retro Rewind',
    description:
      "Reverse-engineering a game's API from the ground up: schema design, Docker, and a deliberate Python-to-Java port to prove the architecture — not just the syntax — travels.",
  },
  {
    slug: 'package-health-checker',
    title: 'Package Health Checker',
    description:
      'Search any package and see its real health: known CVEs, end-of-life status, and maintenance activity — the same diagnostic work I do professionally, built as a tool anyone can use.',
  },
  {
    slug: 'pantry-to-plate',
    title: 'Pantry-to-Plate',
    description:
      'Matches recipes against what\'s actually in your kitchen, down to "you\'re just missing two things" — with a bounded AI assist for using up the odds and ends.',
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
