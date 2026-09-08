import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PackageHealthChecker from './pages/PackageHealthChecker'
import PHCCaseStudy from './pages/PHCCaseStudy'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import RiceCalculator from './pages/RiceCalculator'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen flex flex-col bg-surface transition-colors">
      <div className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

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
      </div>

      <BackToTop />
      <Footer />
    </div>
  )
}

export default App
