'use strict';

/* eslint-disable-next-line n/no-unpublished-require */
const { browsers } = require('./tests/dummy/config/targets');

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-order'],
  rules: {
    /*
      Customize plugins
    */
    'order/properties-order': [
      [
        // Defined by ember-css-modules
        'composes',
      ],
      {
        unspecified: 'bottomAlphabetical',
      },
    ],

    'plugin/no-unsupported-browser-features': [
      true,
      {
        browsers,
        ignore: [
          // grid-template-columns falsely identified as multicolumn
          'multicolumn',
        ],
      },
    ],

    /*
      Customize rules
    */
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['grid-gap', 'grid-template'],
      },
    ],

    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          // Defined by ember-css-modules
          'composes',
        ],
      },
    ],

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          // Defined by ember-css-modules
          'global',
        ],
      },
    ],
  },
};
