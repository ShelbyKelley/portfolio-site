import PackageHealthCheckerTool from '../components/PackageHealthCheckerTool'

import ProjectPage from './ProjectPage'

function PackageHealthChecker() {
  return (
    <ProjectPage title="Package Health Checker">
      <p>
        Search any package and see its real health: known CVEs, severity, and
        links to full advisories — the same diagnostic work I do professionally,
        built as a live tool. Backend runs on AWS Lambda behind API Gateway,
        with rate limiting and input validation.
      </p>
      <PackageHealthCheckerTool />
    </ProjectPage>
  )
}

export default PackageHealthChecker
