'use strict';

require('@shared-configs/eslint-config-ember/patch');

module.exports = {
  extends: ['@shared-configs/eslint-config-ember/app'],
  overrides: [
    // TypeScript files
    {
      files: ['**/*.{gts,ts}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
