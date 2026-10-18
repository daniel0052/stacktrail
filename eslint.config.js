import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
  { ignores: ['**/dist/**', '**/dist-legacy/**', '**/node_modules/**', '**/vendor/**', 'playwright-report/**', 'test-results/**', 'test-results-practice/**', 'playwright-report-practice/**', 'playwright-report-static03/**', 'test-results-static03/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ['**/*.ts', '**/*.tsx'], rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
);
