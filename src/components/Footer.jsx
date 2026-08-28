import { useMemo } from 'react'

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-4">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
        <span>© {year} Shelby Kelley</span>
        <div className="flex gap-4">
          <a
            href="https://github.com/ShelbyKelley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shelbyakelley/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
