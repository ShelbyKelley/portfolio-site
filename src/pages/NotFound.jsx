import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="font-heading font-light text-4xl text-heading mb-4">
        🦇 Page not found
      </h1>
      <p className="text-body mb-6">
        Looks like this page flew off somewhere. Let's get you back.
      </p>
      <Link
        to="/"
        className="inline-block rounded-full border border-control-border px-4 py-2 font-mono text-[13px] no-underline text-body hover:border-brand hover:text-brand transition-colors duration-200"
      >
        ← back to home
      </Link>
    </div>
  )
}

export default NotFound
