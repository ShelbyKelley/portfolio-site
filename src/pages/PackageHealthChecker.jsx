import PackageHealthCheckerTool from '../components/PackageHealthCheckerTool'
import ToolPageHeader from '../components/ToolPageHeader'

function PackageHealthChecker() {
  return (
    <div>
      <ToolPageHeader
        title="Package Health Checker"
        sourceHref="https://github.com/ShelbyKelley/package-health-checker"
      />

      <p className="font-mono text-[13px] mb-8">
        <a
          href="#tool"
          className="text-brand-secondary no-underline hover:text-brand"
        >
          Jump to the tool ↓
        </a>
      </p>

      <div className="text-body leading-relaxed space-y-6">
        <p>
          Search any npm package and see whether it is safe to depend on. This
          tool currently covers the{' '}
          <strong className="text-heading font-medium">
            npm ecosystem only
          </strong>
          .
        </p>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
            Where the data comes from
          </h2>
          <p>
            Package metadata, including the latest version and last publish
            date, comes directly from the{' '}
            <strong className="text-heading font-medium">npm registry</strong>.
            Vulnerability data comes from{' '}
            <strong className="text-heading font-medium">OSV.dev</strong>, an
            open database that aggregates advisories from sources like the
            GitHub Security Advisory database.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
            Reading the results
          </h2>
          <p>
            Each vulnerability shows a{' '}
            <strong className="text-heading font-medium">
              severity rating
            </strong>{' '}
            from low to critical. Higher severity generally means faster
            remediation is warranted. A CVE number appears when one has been
            assigned. Many real vulnerabilities never receive one, so its
            absence does not mean the issue is minor.
          </p>
          <p>
            Click "View advisory" on any result for the exact affected version
            range and remediation guidance. This tool intentionally does not
            compute that range itself. See the case study for why.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
            How it is built
          </h2>
          <p>
            Backend runs on{' '}
            <strong className="text-heading font-medium">AWS Lambda</strong>{' '}
            behind{' '}
            <strong className="text-heading font-medium">API Gateway</strong>,
            with rate limiting and input validation. Full write-up of the
            scoping and trade-off decisions is in the case study.
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
