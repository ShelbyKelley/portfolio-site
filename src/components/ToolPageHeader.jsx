import { Link } from 'react-router-dom'

function ToolPageHeader({ title, sourceHref }) {
  return (
    <>
      <Link
        to="/projects"
        className="inline-block mb-6 font-mono text-[13px] text-body no-underline hover:text-brand transition-colors"
      >
        ← back to projects
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <h1 className="font-heading font-light text-4xl text-heading">
          {title}
        </h1>
        <a
          href={sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-brand px-5 py-2 font-mono text-[13px] no-underline text-brand-contrast hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          view source on github ↗
        </a>
      </div>
    </>
  )
}

export default ToolPageHeader
