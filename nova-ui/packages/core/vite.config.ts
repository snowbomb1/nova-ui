import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true }) // Merges all your types into one clean file
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NovaUI',
      fileName: 'nova-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          motion: 'motion'
        }
      }
    }
  }
});