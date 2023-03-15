import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import vercel from 'solid-start-vercel'
export default defineConfig({
  plugins: [solidPlugin({
    adapter: vercel()
  })],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
