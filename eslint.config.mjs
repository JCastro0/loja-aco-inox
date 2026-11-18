import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/.medusa/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Ficheiros de configuração CommonJS (jest, setup de testes)
    files: ['backend/jest.config.js', 'backend/integration-tests/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'writable', process: 'readonly' },
    },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    // Código herdado do template Medusa: relaxado só nestas pastas
    files: ['backend/src/migration-scripts/**', 'backend/src/search/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
)
