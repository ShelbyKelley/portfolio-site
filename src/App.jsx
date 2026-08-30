import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PackageHealthChecker from './pages/PackageHealthChecker'
import PantryToPlate from './pages/PantryToPlate'
import RetroRewind from './pages/RetroRewind'

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
      <div className="max-w-4xl mx-auto px-6 py-12 flex-1 w-full">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold font-heading text-heading border-b-2 border-brand pb-1">
            Shelby Kelley
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-subtle px-4 py-2 text-sm text-body hover:bg-brand hover:text-brand-contrast hover:border-brand transition-colors"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/retro-rewind" element={<RetroRewind />} />
          <Route
            path="/package-health-checker"
            element={<PackageHealthChecker />}
          />
          <Route path="/pantry-to-plate" element={<PantryToPlate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
