import { Component } from 'react'
import { Link } from 'react-router-dom'

// Class component because React has no hook equivalent for error boundaries.
class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // No error reporting service on a static site.
    // eslint-disable-next-line no-console
    console.error('Unhandled render error:', error, info.componentStack)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="text-center py-16">
        <h1 className="font-heading font-light text-4xl text-heading mb-4">
          Something went wrong
        </h1>
        <p className="text-body mb-6">
          That is on me, not you. Try heading back to the homepage.
        </p>
        <Link
          to="/"
          onClick={this.handleReset}
          className="inline-block rounded-full border border-control-border px-4 py-2 font-mono text-[13px] no-underline text-body hover:border-brand hover:text-brand transition-colors duration-200"
        >
          ← back to home
        </Link>
      </div>
    )
  }
}

export default ErrorBoundary
