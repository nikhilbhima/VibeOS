import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Frontend-only config for UI development
// Use vite.config.electron.ts for full Electron build
export default defineConfig({
  plugins: [react()],
  root: 'src/renderer',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/renderer'),
      '@/components': resolve(__dirname, './src/renderer/components'),
      '@/lib': resolve(__dirname, './src/renderer/lib'),
      '@/hooks': resolve(__dirname, './src/renderer/hooks'),
      '@/stores': resolve(__dirname, './src/renderer/stores'),
      '@/types': resolve(__dirname, './src/shared/types'),
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist/renderer'),
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
