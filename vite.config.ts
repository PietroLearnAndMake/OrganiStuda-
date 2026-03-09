import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: ['log', 'debug', 'warn'],
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.warn'],
        passes: 2,
      },
      format: {
        comments: false,
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'charts-vendor': ['recharts'],
          'ui-vendor': ['lucide-react', 'motion'],
        },
      },
    },
  },
});
