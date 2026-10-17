import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';

// Browser scenarios run separately through Playwright, never inside Vitest.
export default mergeConfig(viteConfig, defineConfig({
  test: { include: ['src/tests/**/*.test.{ts,tsx}'] },
}));
