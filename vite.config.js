import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Path to help-chain folder
 */
const helpPath = "";

// https://vite.dev/config/
/**
 * Don't change those lines below
 */
export default defineConfig({
  root: helpPath,
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
