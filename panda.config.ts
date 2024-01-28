import { defineConfig } from '@pandacss/dev';

export default defineConfig({
	preflight: true, // css reset
	include: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			tokens: {
				fonts: {
					inter: { value: 'Inter' },
				},
			},
		},
	},
	outdir: 'styled-system',
});
