import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Ensures assets resolve correctly in production
  build: {
    outDir: 'dist', // default, but explicit for clarity
  },
});
