import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Header from './components/Header'
import PageTitle from './components/PageTitle'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PackageHealthChecker from './pages/PackageHealthChecker'
import PHCCaseStudy from './pages/PHCCaseStudy'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import RiceCalculator from './pages/RiceCalculator'

// Per-route <title> and meta description, kept next to the routes they
// describe so the two cannot drift apart.
const PAGE_META = {
  '/': {
    title: null,
    description:
      'Technical Product/Program Manager with 8 years in software development, including 5 years leading engineering teams.',
  },
  '/projects': {
    title: 'Projects',
    description:
      'Selected product and program work, including the Package Health Checker and a RICE prioritization calculator.',
  },
  '/package-health-checker': {
    title: 'Package Health Checker',
    description:
      'Search any npm package for known CVEs, severity, and advisory links.',
  },
  '/rice-calculator': {
    title: 'RICE Calculator',
    description:
      'Score and rank competing feature ideas by reach, impact, confidence, and effort.',
  },
  '/phc-case-study': {
    title: 'Package Health Checker Case Study',
    description:
      'The scoping decisions and trade-offs behind the Package Health Checker.',
  },
  '/resume': {
    title: 'Resume',
    description:
      'Resume for Shelby Kelley, Technical Product/Program Manager, available on-page and as a PDF download.',
  },
}

const NOT_FOUND_META = { title: 'Page not found', description: null }

// localStorage is unavailable in some privacy modes and embedded webviews,
// where touching it throws. The theme is a nicety, so fall back to light
// rather than taking the whole app down with it.
function readStoredTheme() {
  try {
    return localStorage.getItem('theme')
  } catch {
    return null
  }
}

function storeTheme(value) {
  try {
    localStorage.setItem('theme', value)
  } catch {
    // Preference simply will not persist. Nothing else to do.
  }
}

function App() {
  const { pathname } = useLocation()
  const [darkMode, setDarkMode] = useState(() => readStoredTheme() === 'dark')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', darkMode)
    storeTheme(darkMode ? 'dark' : 'light')
  }, [darkMode])

  const meta = PAGE_META[pathname] ?? NOT_FOUND_META

  return (
    <div className="min-h-screen flex flex-col bg-surface transition-[background-color,color] duration-420 ease-in-out">
      <PageTitle title={meta.title} description={meta.description} />
      <ScrollToTop />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-4 focus:left-4 focus:rounded-full focus:border focus:border-subtle focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:text-body focus:no-underline"
      >
        Skip to content
      </a>

      <div className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route
              path="/package-health-checker"
              element={<PackageHealthChecker />}
            />
            <Route path="/rice-calculator" element={<RiceCalculator />} />
            <Route path="/phc-case-study" element={<PHCCaseStudy />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>

      <BackToTop />
      <Footer />
    </div>
  )
}

export default App
