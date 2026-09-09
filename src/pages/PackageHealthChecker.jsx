import { Link } from 'react-router-dom'

import PackageHealthCheckerTool from '../components/PackageHealthCheckerTool'

function PackageHealthChecker() {
  return (
    <div className="animate-fade-in-up">
      <Link
        to="/projects"
        className="inline-block mb-6 text-sm text-body hover:text-brand transition-colors"
      >
        ← Back to projects
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
        <h1 className="font-heading text-3xl font-bold text-brand">
          Package Health Checker
        </h1>
        <a
          href="https://github.com/ShelbyKelley/package-health-checker"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-brand px-5 py-2 text-brand-contrast font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          View source on GitHub ↗
        </a>
      </div>

      <p className="text-sm mb-8">
        <a href="#tool" className="text-brand-secondary hover:underline">
          Jump to the tool ↓
        </a>
      </p>

      <div className="text-body leading-relaxed space-y-6">
        <p>
          Search any npm package and see whether it is safe to depend on. This
          tool currently covers the{' '}
          <strong className="text-heading">npm ecosystem only</strong>.
        </p>

        <section>
          <h2 className="font-heading text-xl font-semibold text-brand-secondary mb-2">
            Where the data comes from
          </h2>
          <p>
            Package metadata, including the latest version and last publish
            date, comes directly from the{' '}
            <strong className="text-heading">npm registry</strong>.
            Vulnerability data comes from{' '}
            <strong className="text-heading">OSV.dev</strong>, an open database
            that aggregates advisories from sources like the GitHub Security
            Advisory database.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-brand-secondary mb-2">
            Reading the results
          </h2>
          <p>
            Each vulnerability shows a{' '}
            <strong className="text-heading">severity rating</strong> from low
            to critical. Higher severity generally means faster remediation is
            warranted. A CVE number appears when one has been assigned. Many
            real vulnerabilities never receive one, so its absence does not mean
            the issue is minor.
          </p>
          <p>
            Click "View advisory" on any result for the exact affected version
            range and remediation guidance. This tool intentionally does not
            compute that range itself. See the case study for why.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-brand-secondary mb-2">
            How it is built
          </h2>
          <p>
            Backend runs on <strong className="text-heading">AWS Lambda</strong>{' '}
            behind <strong className="text-heading">API Gateway</strong>, with
            rate limiting and input validation. Full write-up of the scoping and
            trade-off decisions is in the case study.
          </p>
        </section>
      </div>

      <div id="tool" className="mt-10 pt-10 border-t border-subtle">
        <PackageHealthCheckerTool />
      </div>
    </div>
  )
}

export default PackageHealthChecker
