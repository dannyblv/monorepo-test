import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  build: {
    outDir: 'dist',
  },
  // Configure path aliases for workspace packages
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, '../common/src'),
    },
  },
});
