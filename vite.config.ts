import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// Currently deploying to the default GitHub Pages project-page URL —
// https://leidaeunise22.github.io/reddsairbrush/ — which is served from a
// '/reddsairbrush/' subpath, not the domain root. When the custom domain
// (reddsairbrush.com) is ready to go live: add public/CNAME back containing
// "reddsairbrush.com", change `base` below to '/', and set the custom
// domain in Settings → Pages (see README.md's deployment section).
const REPO_NAME = 'reddsairbrush'

export default defineConfig(() => ({
  base: process.env.VITE_BASE_PATH ?? `/${REPO_NAME}/`,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
