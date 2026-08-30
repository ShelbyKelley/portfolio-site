import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center py-16 animate-fade-in-up">
      <h1 className="text-3xl font-bold font-heading text-brand mb-4">
        🦇 Page not found
      </h1>
      <p className="text-body mb-6">
        Looks like this page flew off somewhere. Let's get you back.
      </p>
      <Link
        to="/"
        className="inline-block rounded-full border border-subtle px-4 py-2 text-sm text-body hover:bg-brand hover:text-brand-contrast hover:border-brand transition-colors"
      >
        ← Back to home
      </Link>
    </div>
  )
}

export default NotFound
