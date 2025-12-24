import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Removed alias configuration as there is no 'src' directory
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});