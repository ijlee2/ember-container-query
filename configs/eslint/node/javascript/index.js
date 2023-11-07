'use strict';

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    requireConfigFile: false,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:n/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    curly: 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
  overrides: [
    // JavaScript files
    {
      files: ['**/*.{cjs,js}'],
      rules: {
        'import/no-duplicates': 'error',
      },
    },
    // Node files
    {
      files: ['./.eslintrc.{cjs,js}', './.prettierrc.{cjs,js}'],
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
  ],
};
