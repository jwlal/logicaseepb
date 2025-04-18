import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Add this line to make assets load correctly on GitHub Pages
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});