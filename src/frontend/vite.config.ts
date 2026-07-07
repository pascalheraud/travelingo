import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'serve-fixtures',
      configureServer(server) {
        const fixturesDir = path.resolve(__dirname, '../fixtures');
        server.middlewares.use('/fixtures', (req, res, next) => {
          const filePath = path.join(fixturesDir, req.url ?? '');
          if (!filePath.startsWith(fixturesDir)) { next(); return; }
          if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) { next(); return; }
          const ext = path.extname(filePath);
          const mime: Record<string, string> = { '.json': 'application/json', '.mp3': 'audio/mpeg' };
          res.setHeader('Content-Type', mime[ext] ?? 'application/octet-stream');
          fs.createReadStream(filePath).pipe(res);
        });
      },
    },
  ],
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
