'use strict';

module.exports = {
  printWidth: 80,
  singleQuote: true,

  overrides: [
    {
      files: '*.hbs',
      options: {
        printWidth: 64,
        singleQuote: false,
      },
    },
  ],
};
