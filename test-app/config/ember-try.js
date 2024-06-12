'use strict';

const { embroiderOptimized, embroiderSafe } = require('@embroider/test-setup');

module.exports = async function () {
  const { default: latestVersion } = await import('latest-version');

  return {
    usePnpm: true,
    scenarios: [
      {
        name: 'ember-lts-4.4',
        npm: {
          devDependencies: {
            'ember-resolver': '11.0.1',
            'ember-source': '~4.4.0',
          },
        },
      },
      {
        name: 'ember-lts-4.8',
        npm: {
          devDependencies: {
            'ember-resolver': '11.0.1',
            'ember-source': '~4.8.0',
          },
        },
      },
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.4',
        npm: {
          devDependencies: {
            'ember-source': '~5.4.0',
          },
        },
      },
      {
        name: 'ember-lts-5.8',
        npm: {
          devDependencies: {
            'ember-source': '~5.8.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await latestVersion('ember-source'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await latestVersion('ember-source', {
              version: 'beta',
            }),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await latestVersion('ember-source', {
              version: 'alpha',
            }),
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
