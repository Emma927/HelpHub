import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { imagetools } from 'vite-imagetools';

/**
 * Path to help-chain folder
 */
const helpPath = '';

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
  plugins: [react(), imagetools()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), //  Alias @ w resolve.alias pozwala używać skróconej ścieżki do katalogu src, co upraszcza importy.
    },
  },
});
