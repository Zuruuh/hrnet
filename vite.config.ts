import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig((env) => ({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/route-tree.gen.ts',
      routeFileIgnorePrefix: '-',
    }),
  ],
  build: {
    sourcemap: env.command === 'serve',
  },
}));
