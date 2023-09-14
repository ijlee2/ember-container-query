'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'ember',
    '@typescript-eslint',
    'simple-import-sort',
    'typescript-sort-keys',
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    curly: 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  overrides: [
    // TypeScript files
    {
      files: ['**/*.{gts,ts}'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
        'plugin:typescript-sort-keys/recommended',
      ],
      rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'off',
      },
    },
    // JavaScript files
    {
      files: ['**/*.{gjs,js}'],
      rules: {
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'off',
      },
    },
    // Node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './postcss.config.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    // Test files
    {
      files: ['tests/**/*-test.{gjs,gts,js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
  ],
};
