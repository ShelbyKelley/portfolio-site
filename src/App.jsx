import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import BackToTop from './components/BackToTop'
import ErrorBoundary from './components/ErrorBoundary'
import Footer from './components/Footer'
import Header from './components/Header'
import PageMeta from './components/PageMeta'
import ScrollToTop from './components/ScrollToTop'
import { readStoredString, writeStoredString } from './lib/storage'
import { routes } from './routes'

function App() {
  const { pathname } = useLocation()
  const [darkMode, setDarkMode] = useState(
    () => readStoredString('theme') === 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    writeStoredString('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="min-h-screen flex flex-col bg-surface transition-[background-color,color] duration-420 ease-in-out">
      <PageMeta />
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
          {/* Keyed by pathname so navigating away clears a caught error. */}
          <ErrorBoundary key={pathname}>
            <Routes>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </ErrorBoundary>
        </main>
      </div>

      <BackToTop />
      <Footer />
    </div>
  )
}

export default App
