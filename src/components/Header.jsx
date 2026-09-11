import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'home' },
  { to: '/projects', label: 'projects' },
  { to: '/resume', label: 'resume' },
]

// NavLink sets aria-current="page" on the active route for screen readers and
// gives us the matching visual state for free.
function navLinkClass({ isActive }) {
  return [
    'no-underline transition-colors hover:text-brand',
    isActive ? 'text-brand' : 'text-body',
  ].join(' ')
}

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="flex items-baseline justify-between mb-16 flex-wrap gap-4 border-b border-subtle pb-6">
      <Link
        to="/"
        className="flex items-baseline gap-3 font-mono text-[13px] uppercase tracking-[0.16em] no-underline hover:opacity-80 transition-opacity"
      >
        <span className="text-body">Shelby Kelley</span>
        <span className="text-brand-secondary normal-case">/ technical pm</span>
      </Link>
      <nav
        aria-label="Main"
        className="flex items-center gap-6 font-mono text-[13px]"
      >
        {navItems.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'} className={navLinkClass}>
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={() => setDarkMode((isDark) => !isDark)}
          className="rounded-full border border-control-border px-3.5 py-1.5 min-h-8 tracking-[0.08em] text-body hover:border-brand hover:text-brand transition-colors duration-200"
        >
          {darkMode ? 'light mode' : 'dark mode'}
        </button>
      </nav>
    </header>
  )
}

export default Header
