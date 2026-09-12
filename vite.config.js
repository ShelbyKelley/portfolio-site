/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
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
    },
  },
})
