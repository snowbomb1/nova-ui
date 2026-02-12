import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@nova-ui/core/styles': path.resolve(__dirname, '../packages/core/src/index.css'),
        '@nova-ui/core': path.resolve(__dirname, '../packages/core/src/index.ts'),
    },
  },
  optimizeDeps: {
    rolldownOptions: {} 
  },
  server: {
    fs: {
        allow: ['..']
    },
    port: 3000,
    open: true,
  },
});