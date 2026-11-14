import { defineConfig } from 'vitest/config'

// Standalone vitest config: deliberately does NOT import vite.config.ts,
// whose @cloudflare/vite-plugin hard-fails vitest startup with
// "environment options are incompatible with the Cloudflare Vite plugin"
// (vitest sets resolve.external on its ssr/test environments).
// passWithNoTests keeps the task green until real tests land.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    passWithNoTests: true,
  },
})
