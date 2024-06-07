'use strict';

const sideWatch = require('@embroider/broccoli-side-watch');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['ember-container-query'],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    trees: {
      app: sideWatch('app', {
        watching: ['../packages/ember-container-query/src'],
      }),
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app);
};
