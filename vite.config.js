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
      '@': path.resolve(__dirname, './src'), // Alias @ w resolve.alias pozwala używać skróconej ścieżki do katalogu src, co upraszcza importy.
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // zwiększa limit ostrzeżeń do 1 MB
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
