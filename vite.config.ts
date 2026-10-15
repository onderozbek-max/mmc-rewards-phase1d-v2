import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/mmc-rewards-phase1d-v2/' : '/',
  plugins: [react()],
  server: {
    port: 3099,
  },
}));
