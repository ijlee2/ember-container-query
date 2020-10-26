'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = async function() {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-3.16',
        allowedToFail: true,
        npm: {
          devDependencies: {
            'ember-source': '~3.16.0'
          }
        }
      },
      {
        name: 'ember-lts-3.20',
        npm: {
          devDependencies: {
            'ember-source': '~3.20.5'
          }
        }
      },
      {
        name: 'ember-release',
        allowedToFail: true,
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release')
          }
        }
      },
      {
        name: 'ember-beta',
        allowedToFail: true,
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta')
          }
        }
      },
    ]
  };
};