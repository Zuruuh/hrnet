import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import million from 'million/compiler';

export default defineConfig((env) => ({
	plugins: [/*million.vite({ auto: true }),*/ react(), TanStackRouterVite()],
	build: {
		sourcemap: env.command === 'serve',
	},
}));
