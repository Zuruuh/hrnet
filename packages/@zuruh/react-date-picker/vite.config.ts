import { resolve } from 'path';
import { defineConfig } from 'vite';
import packageJson from './package.json' assert { type: 'json' };
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    dts({ insertTypesEntry: true }),
    tsConfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: '@zuruh/react-date-picker',
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
    minify: true,
  },
  test: {
    setupFiles: ['./bootstrap.tsx'],
    environment: 'jsdom',
    silent: false,
  },
});
