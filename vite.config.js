import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('react-router-dom')) {
            return 'vendor-react'
          }
          if (
            id.includes('@mui/material') ||
            id.includes('@mui/icons-material') ||
            id.includes('@mui/x-data-grid')
          ) {
            return 'vendor-mui'
          }
          if (id.includes('@react-three/fiber') || id.includes('@react-three/drei')) {
            return 'vendor-3d'
          }
          if (
            id.includes('framer-motion') ||
            id.includes('recharts') ||
            id.includes('swiper') ||
            id.includes('zustand')
          ) {
            return 'vendor-visuals'
          }
          return undefined
        },
      },
    },
  },
})
