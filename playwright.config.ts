import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__/e2e',
  use: {
    baseURL: 'http://localhost:3000/',
  },
  fullyParallel: true,
});
