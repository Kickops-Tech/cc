import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

/**
 * Current working directory, always relative to the project root.
 */
const WORK_DIR = process.cwd();

export default defineConfig({
  plugins: [],
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@': resolve(WORK_DIR, 'src'),
      '~': resolve(WORK_DIR, 'lib'),
      '#': resolve(WORK_DIR, 'test'),
    },
  },
});
