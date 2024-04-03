import { defineConfig, defineKeyframes } from '@pandacss/dev';

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
      keyframes: defineKeyframes({
        modalFade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        modalZoom: {
          from: {
            transform: 'scale(0.8)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
      }),
    },
  },
  outdir: 'styled-system',
});
