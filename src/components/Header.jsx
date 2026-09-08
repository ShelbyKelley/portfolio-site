import { Link } from 'react-router-dom'

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="flex items-center justify-between mb-12 flex-wrap gap-4">
      <Link
        to="/"
        className="font-heading text-4xl font-bold text-heading border-b-2 border-brand pb-1 hover:opacity-80 transition-opacity"
      >
        Shelby Kelley
      </Link>
      <nav className="flex items-center gap-6">
        <Link to="/" className="text-body hover:text-brand transition-colors">
          Home
        </Link>
        <Link
          to="/projects"
          className="text-body hover:text-brand transition-colors"
        >
          Projects
        </Link>
        <Link
          to="/resume"
          className="text-body hover:text-brand transition-colors"
        >
          Resume
        </Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full border border-subtle px-4 py-2 text-sm text-body hover:bg-brand hover:text-brand-contrast hover:border-brand transition-colors"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </nav>
    </header>
  )
}

export default Header
