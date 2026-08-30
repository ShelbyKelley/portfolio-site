function ProjectCard({ title, description }) {
  return (
    <div className="h-full flex flex-col rounded-lg border border-subtle bg-surface-alt p-6 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-brand-secondary hover:bg-surface-hover transition-all">
      <h2 className="text-xl font-heading font-semibold text-brand mb-2">
        {title}
      </h2>
      <p className="text-body leading-relaxed">{description}</p>
    </div>
  )
}

export default ProjectCard
