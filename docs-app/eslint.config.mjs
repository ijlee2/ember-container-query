import eslintConfigEmberApp from '@shared-configs/eslint-config-ember/app/index.js';

export default [
  ...eslintConfigEmberApp,
  {
    files: ['**/*.{gts,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
