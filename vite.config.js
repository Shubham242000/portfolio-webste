import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // React rarely changes, so keep it in its own chunk; content edits then don't invalidate it in visitors' caches.
        manualChunks: { react: ['react', 'react-dom', 'react-dom/client'] },
      },
    },
  },
})
