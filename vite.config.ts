import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/thuan-chau-pagoda/',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', sourcemap: false }
})
