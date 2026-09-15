/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { coverageConfigDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    pool: 'vmThreads',
    setupFiles: ['./src/test-utils/setup.js'],
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    restoreMocks: true,
    // PackageHealthCheckerTool reads its API URL into a module-level const at
    // import time, so a per-test vi.stubEnv() runs too late. Give tests a
    // default here instead; the one test exercising the missing-URL case
    // clears it with vi.stubEnv() + vi.resetModules() before a dynamic import.
    env: {
      VITE_PACKAGE_HEALTH_API_URL: 'https://api.example.com',
    },
    coverage: {
      // Ratchet, not a target. Lower it deliberately or not at all.
      thresholds: { statements: 95, branches: 95, functions: 95, lines: 95 },
      // Everything in PackageHealthChecker/ except Tool.jsx is synced from
      // the package-health-checker repo, which owns the real test suite for
      // these components. Tool.test.jsx covers Tool.jsx itself (this site's
      // own integration surface), so that file stays counted.
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/components/PackageHealthChecker/AdvisoryList.jsx',
        'src/components/PackageHealthChecker/AuditBuilder.js',
        'src/components/PackageHealthChecker/AuditExports.js',
        'src/components/PackageHealthChecker/AuditReport.jsx',
        'src/components/PackageHealthChecker/AuditTab.jsx',
        'src/components/PackageHealthChecker/Concurrency.js',
        'src/components/PackageHealthChecker/Constants.js',
        'src/components/PackageHealthChecker/FindingsTable.jsx',
        'src/components/PackageHealthChecker/HealthCard.jsx',
        'src/components/PackageHealthChecker/HealthScore.js',
        'src/components/PackageHealthChecker/LockfileParsing.js',
        'src/components/PackageHealthChecker/Notes.jsx',
        'src/components/PackageHealthChecker/Pagination.jsx',
        'src/components/PackageHealthChecker/SearchTab.jsx',
      ],
    },
  },
})
