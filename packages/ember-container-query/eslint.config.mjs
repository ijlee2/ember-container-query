import baseConfiguration from '@ijlee2-frontend-configs/eslint-config-ember/v2-addon';

export default [
  ...baseConfiguration,
  {
    files: ['**/*.{gts,ts}'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
