import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // 1. Ignore specific folders/files
  globalIgnores(['dist', 'node_modules', 'test-results', 'playwright-report']),
  // 2. App configuration (React)
  {
    files: ['**/*.{js,jsx}'], // all JS/JSX files
    // 2a. Presets
    extends: [
      js.configs.recommended, // basic JS rules
      react.configs.flat.recommended, // React rules
      reactHooks.configs.flat.recommended, // React Hooks rules
      reactRefresh.configs.vite, // Vite + HMR integration
    ],
    // 2b. React settings
    settings: {
      react: {
        version: 'detect', // automatically detect React version
      },
    },
    // 2c. Language options
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: { jsx: true },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    // 2d. Custom rules (overides persets)
    rules: {
      // React 17+ does not require import React
      'react/react-in-jsx-scope': 'off',

      // not using prop-types
      'react/prop-types': 'off',

      // debugger is an error in CI/build
      'no-debugger': 'error',

      'no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^[A-Z]', // ignore JSX component vars
          argsIgnorePattern: '^_', // ignore _unused args
        },
      ],

      // warn for setState in effect
      'react-hooks/set-state-in-effect': 'warn',

      // allow non-component exports
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // 3. Test files configuration (Vitest/Jest)
  {
    files: [
      '**/*.test.js',
      '**/*.spec.js',
      '**/*.test.jsx',
      '**/*.spec.jsx',
      '**/setupTests.js', // global test setup
    ],

    languageOptions: {
      globals: {
        // manually define Vitest globals as 'readonly'
        ...globals.jest, // use Jest globals (also compatible with Vitest)
        vi: 'readonly',
      },
    },

    rules: {
      // warn only for unused vars in tests
      'no-unused-vars': 'warn',
    },
  },
]);
