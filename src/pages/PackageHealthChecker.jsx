import PackageHealthCheckerNotes from '../components/PackageHealthChecker/Notes'
import PackageHealthCheckerTool from '../components/PackageHealthChecker/Tool'
import ToolPageHeader from '../components/ToolPageHeader'

function PackageHealthChecker() {
  return (
    <div>
      <ToolPageHeader
        title="Package Health Checker"
        sourceHref="https://github.com/ShelbyKelley/package-health-checker"
      />

      <div className="max-w-270 mx-auto pb-[clamp(56px,10vh,104px)]">
        <PackageHealthCheckerTool />
      </div>

      <PackageHealthCheckerNotes />
    </div>
  )
}

export default PackageHealthChecker
