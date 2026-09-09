import ToolPageHeader from '../components/ToolPageHeader'

const sections = [
  { id: 'problem', label: 'Problem' },
  { id: 'scope-decisions', label: 'Scope decisions' },
  { id: 'risk-and-security', label: 'Risk and security posture' },
  { id: 'next-steps', label: "What I'd prioritize next" },
]

function PHCCaseStudy() {
  return (
    <div>
      <ToolPageHeader
        title="Case Study: Package Health Checker"
        sourceHref="https://github.com/ShelbyKelley/package-health-checker"
      />

      <nav aria-label="Page sections" className="mb-10 font-mono text-[13px]">
        <span className="text-body mr-2">Jump to:</span>
        {sections.map((section, index) => (
          <span key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-brand-secondary no-underline hover:text-brand"
            >
              {section.label}
            </a>
            {index < sections.length - 1 && (
              <span className="text-body mx-2">·</span>
            )}
          </span>
        ))}
      </nav>

      <div className="text-body leading-relaxed space-y-8">
        <section id="problem">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
            Problem
          </h2>
          <p>
            Assessing whether a package is safe to depend on takes checking
            several disconnected sources by hand. That means the registry for
            basic metadata, a vulnerability database for known CVEs, and each
            advisory individually for severity and affected versions. I wanted a{' '}
            <strong className="text-heading font-medium">single tool</strong>{' '}
            that answers "is this package healthy" in one lookup, reflecting
            diagnostic work I already do professionally.
          </p>
        </section>

        <section id="scope-decisions">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
            Scope decisions
          </h2>
          <p>
            The riskiest early decision was how much to compute versus how much
            to defer to an authoritative source. I initially built logic to
            reconcile version ranges across multiple advisory sources for the
            same vulnerability. That logic grew genuinely complex, and it became
            a real source of subtle bugs during testing. I{' '}
            <strong className="text-heading font-medium">cut it</strong> in
            favor of linking directly to each advisory's own page instead. That
            traded real analytical depth for reliability and maintainability. It
            was the right call for a tool meant to be trusted at a glance, not
            audited line by line.
          </p>
        </section>

        <section id="risk-and-security">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
            Risk and security posture
          </h2>
          <p>
            Once the API was going to be public, abuse became a real planning
            concern, not a hypothetical one. Rather than rely on a billing alert
            to catch a problem after it happened, I required{' '}
            <strong className="text-heading font-medium">
              input validation
            </strong>{' '}
            and{' '}
            <strong className="text-heading font-medium">
              real rate limiting
            </strong>{' '}
            at the infrastructure layer. Both are enforced before a request ever
            reaches billed compute, not after.
          </p>
        </section>

        <section id="next-steps">
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-brand-secondary mb-3">
            What I'd prioritize next
          </h2>
          <p>
            Support for ecosystems beyond npm, such as PyPI and crates.io, is
            the highest-leverage next step. It reuses the same interface while
            broadening who can actually use the tool. After that, I'd want{' '}
            <strong className="text-heading font-medium">
              real usage data
            </strong>{' '}
            before investing further, rather than guessing at what to build
            next.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PHCCaseStudy
