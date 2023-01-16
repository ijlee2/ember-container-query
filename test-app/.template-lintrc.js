'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  overrides: [
    {
      files: ['addon/**/*.hbs', 'tests/**/*-test.{js,ts}'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};
