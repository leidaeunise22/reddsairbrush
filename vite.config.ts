import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// This site deploys to the custom domain reddsairbrush.com (see
// public/CNAME), which is served from the domain root, so `base` is '/' —
// not a '/<repo-name>/' subpath. If you ever remove the custom domain and
// fall back to the default GitHub Pages project-page URL instead
// (<user>.github.io/<repo-name>/), delete public/CNAME and change `base`
// below to `/<repo-name>/` in production (or pass VITE_BASE_PATH at build
// time to override without editing this file).
export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
