import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./bootstrap.tsx'],
    environment: 'jsdom',
    silent: false,
  },
});
