function ProjectCard({ title, description }) {
  return (
    <div className="h-full flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default ProjectCard
