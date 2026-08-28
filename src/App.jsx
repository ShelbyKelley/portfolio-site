import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
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
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Shelby Kelley
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
        </Routes>
      </div>
    </div>
  )
}

export default App
