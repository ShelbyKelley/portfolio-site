import PackageHealthCheckerTool from '../components/PackageHealthCheckerTool'

import ProjectPage from './ProjectPage'

function PackageHealthChecker() {
  return (
    <ProjectPage title="Package Health Checker">
      <p>
        Search any npm package and see whether it is safe to depend on. This
        tool currently covers the npm ecosystem only.
      </p>

      <section>
        <h2 className="font-heading text-xl font-semibold text-heading mb-2">
          Where the data comes from
        </h2>
        <p>
          Package metadata, including the latest version and last publish date,
          comes directly from the npm registry. Vulnerability data comes from
          OSV.dev, an open database that aggregates advisories from sources like
          the GitHub Security Advisory database.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-heading mb-2">
          Reading the results
        </h2>
        <p>
          Each vulnerability shows a severity rating from low to critical.
          Higher severity generally means faster remediation is warranted. A CVE
          number appears when one has been assigned. Many real vulnerabilities
          never receive one, so its absence does not mean the issue is minor.
        </p>
        <p>
          Click &quot;View advisory&quot; on any result for the exact affected
          version range and remediation guidance. This tool intentionally does
          not compute that range itself. See the case study for why.
        </p>
      </section>

      <section>
        <h2 className="font-heading text-xl font-semibold text-heading mb-2">
          How it is built
        </h2>
        <p>
          Backend runs on AWS Lambda behind API Gateway, with rate limiting and
          input validation. Full write-up of the scoping and trade-off decisions
          is in the case study.
        </p>
      </section>

      <PackageHealthCheckerTool />
    </ProjectPage>
  )
}

export default PackageHealthChecker
