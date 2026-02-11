import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@nova-ui/core': path.resolve(__dirname, '../packages/core/src/index.ts'),
      '@nova-ui/core/styles': path.resolve(__dirname, '../packages/core/src/index.css')
    },
  },
  optimizeDeps: {
    rolldownOptions: {} 
  },
  server: {
    port: 3000,
    open: true,
  },
});