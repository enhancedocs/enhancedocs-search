import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName(name) {
        return name;
      }
    }
  },
  build: {
    lib: {
      name: 'EnhancedocsSearch',
      entry: './lib/index.ts'
    },
    rollupOptions: {
      external: ['react'],
      output: {
        name: 'EnhancedocsSearch',
        exports:'named',
        globals: {
          react: 'React'
        }
      }
    },
    emptyOutDir: false,
    copyPublicDir: false
  },
  ssr: {
    noExternal: ['react-markdown']
  }
});
