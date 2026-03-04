import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { imagetools } from 'vite-imagetools';

/**
 * Path to helpHub folder
 */
const helpPath = '.';

/**
 * Don't change those lines below
 */
export default defineConfig({
  root: helpPath,
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react(), imagetools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 'id' is the full path of the module Rollup is processing.
  // manualChunks(id) lets you control which modules go into which chunks.
  // chunkSizeWarningLimit is increased to 1 MB to reduce warnings.
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
