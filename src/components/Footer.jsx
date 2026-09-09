import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMemo } from 'react'

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="border-t border-subtle mt-4">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between font-mono text-[13px] text-body">
        <span>© {year} Shelby Kelley</span>
        <div className="flex gap-4">
          <a
            href="https://github.com/ShelbyKelley"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="no-underline text-body hover:text-brand transition-colors"
          >
            <FontAwesomeIcon icon={faGithub} size="lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/shelbyakelley/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="no-underline text-body hover:text-brand transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
