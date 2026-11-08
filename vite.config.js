import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // gh-pages publica en /<repositorio>/; App.jsx usa esta base como basename del router
  base: '/supermercado-felipe-penaloza-pfy2202/',
})
