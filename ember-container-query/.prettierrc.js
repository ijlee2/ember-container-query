'use strict';

module.exports = {
  overrides: [
    {
      files: '*.css.d.ts',
      options: {
        quoteProps: 'preserve',
      },
    },
    {
      files: '*.hbs',
      options: {
        printWidth: 64,
        singleQuote: false,
      },
    },
    {
      files: '*.{cjs,cts,js,mjs,mts,ts}',
      options: {
        printWidth: 80,
        singleQuote: true,
        trailingComma: 'all',
      },
    },
  ],
};
