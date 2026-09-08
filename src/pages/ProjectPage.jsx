import { Link } from 'react-router-dom'

function ProjectPage({ title, children }) {
  return (
    <div className="animate-fade-in-up">
      <Link
        to="/projects"
        className="inline-block mb-6 text-sm text-body hover:text-brand transition-colors"
      >
        ← Back to all projects
      </Link>
      <h1 className="text-3xl font-bold font-heading text-brand mb-4">
        {title}
      </h1>
      <div className="text-body leading-relaxed space-y-4">{children}</div>
    </div>
  )
}

export default ProjectPage
