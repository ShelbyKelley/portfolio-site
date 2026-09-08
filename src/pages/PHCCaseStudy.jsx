import { Link } from 'react-router-dom'

function PHCCaseStudy() {
  return (
    <div className="animate-fade-in-up">
      <Link
        to="/"
        className="inline-block mb-6 text-sm text-body hover:text-brand transition-colors"
      >
        ← Back to all projects
      </Link>
      <h1 className="font-heading text-3xl font-bold text-brand mb-4">
        Case Study: Package Health Checker
      </h1>
      <div className="text-body leading-relaxed space-y-6">
        <section>
          <h2 className="font-heading text-xl font-semibold text-heading mb-2">
            Problem
          </h2>
          <p>
            Assessing whether a package is safe to depend on takes checking
            several disconnected sources by hand. That means the registry for
            basic metadata, a vulnerability database for known CVEs, and each
            advisory individually for severity and affected versions. I wanted a
            single tool that answers "is this package healthy" in one lookup,
            reflecting diagnostic work I already do professionally.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-heading mb-2">
            Scope decisions
          </h2>
          <p>
            The riskiest early decision was how much to compute versus how much
            to defer to an authoritative source. I initially built logic to
            reconcile version ranges across multiple advisory sources for the
            same vulnerability. That logic grew genuinely complex, and it became
            a real source of subtle bugs during testing. I cut it in favor of
            linking directly to each advisory's own page instead. That traded
            real analytical depth for reliability and maintainability. It was
            the right call for a tool meant to be trusted at a glance, not
            audited line by line.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-heading mb-2">
            Risk and security posture
          </h2>
          <p>
            Once the API was going to be public, abuse became a real planning
            concern, not a hypothetical one. Rather than rely on a billing alert
            to catch a problem after it happened, I required input validation
            and real rate limiting at the infrastructure layer. Both are
            enforced before a request ever reaches billed compute, not after.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-semibold text-heading mb-2">
            What I'd prioritize next
          </h2>
          <p>
            Support for ecosystems beyond npm, such as PyPI and crates.io, is
            the highest-leverage next step. It reuses the same interface while
            broadening who can actually use the tool. After that, I'd want real
            usage data before investing further, rather than guessing at what to
            build next.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PHCCaseStudy
