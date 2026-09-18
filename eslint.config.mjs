import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // 1. Recommended bug-prevention rules from ESLint core
  js.configs.recommended,

  // 2. Project-specific rules and environment
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'off',
    },
  },

  // 3. Prettier override (must always be the last entry)
  eslintConfigPrettier,
];
