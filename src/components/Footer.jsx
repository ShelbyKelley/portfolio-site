import { GithubIcon, LinkedinIcon } from './BrandIcons'

// Module scope: new Date() during render is impure (@eslint-react/purity).
const YEAR = new Date().getFullYear()

function Footer() {
  return (
    <footer className="border-t border-subtle mt-4">
      <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between font-mono text-[13px] text-body">
        <span>© {YEAR} Shelby Kelley</span>
        <div className="flex gap-4">
          <a
            href="https://github.com/ShelbyKelley"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="no-underline text-body hover:text-brand transition-colors"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/shelbyakelley/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="no-underline text-body hover:text-brand transition-colors"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
