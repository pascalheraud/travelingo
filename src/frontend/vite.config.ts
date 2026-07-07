import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@':          path.resolve(__dirname),
      '@ui':        path.resolve(__dirname, 'ui'),
      '@features':  path.resolve(__dirname, 'features'),
      '@contexts':  path.resolve(__dirname, 'contexts'),
      '@services':  path.resolve(__dirname, 'services'),
      '@utils':     path.resolve(__dirname, 'utils'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `@use "${path.resolve(__dirname, 'styles/variables')}" as *; @use "${path.resolve(__dirname, 'styles/mixins')}" as *;`,
      },
    },
  },
  build: {
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
});
