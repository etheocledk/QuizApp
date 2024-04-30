import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', 
    globals: true,
    setupFiles: ['./test/setup.js'],
    exclude: [...configDefaults.exclude, 'node_modules/**'],
  },
});
