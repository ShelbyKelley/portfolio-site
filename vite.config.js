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
    coverage: {
      // Ratchet, not a target. Lower it deliberately or not at all.
      thresholds: { statements: 95, branches: 95, functions: 95, lines: 95 },
    },
  },
})
