'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['ember-container-query'],
    },
  });

  return require('@embroider/compat').compatBuild(app, Webpack, {
    packagerOptions: {
      webpackConfig: {
        // ...
      },
    },
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    splitAtRoutes: ['album', 'dashboard', 'form', 'products'],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: false, // due to ember-css-modules
    staticComponents: false, // due to ember-css-modules
    staticHelpers: true,
    staticModifiers: true,
  });
};
