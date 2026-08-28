import { Link } from 'react-router-dom'

function ProjectPage({ title, children }) {
  return (
    <div>
      <Link
        to="/"
        className="inline-block mb-6 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        ← Back to all projects
      </Link>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h1>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  )
}

export default ProjectPage
