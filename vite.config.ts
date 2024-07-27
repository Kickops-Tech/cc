import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Current working directory, always relative to the project root.
 */
const WORK_DIR = process.cwd();

export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(WORK_DIR, 'lib', 'index.ts'),
      fileName: (format) => `index.${format}.js`,
      name: '@kickops/cc',
    },
  },
  resolve: {
    alias: {
      '@': resolve(WORK_DIR, 'src'),
      '~': resolve(WORK_DIR, 'lib'),
      '#': resolve(WORK_DIR, 'test'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
