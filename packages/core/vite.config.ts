import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true, insertTypesEntry: true, include: ['src'] }),
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
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
      name: 'NovaUI',
      fileName: 'nova-ui',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'motion'],
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') return '[name].js';
          return 'components/[name]/index.js';
        },
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: '[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          motion: 'motion'
        }
      }
    }
  }
});