'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

function isProduction() {
  return EmberApp.env() === 'production';
}

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['ember-container-query'],
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  const options = {
    packagerOptions: {
      cssLoaderOptions: {
        modules: {
          localIdentName: isProduction()
            ? '[sha512:hash:base64:5]'
            : '[path][name]__[local]',
          mode: (resourcePath) => {
            // We want to enable the local mode only for our own host app.
            // All other addons should be loaded in the global mode.
            const hostAppLocation =
              'docs-app/node_modules/.embroider/rewritten-app';

            return resourcePath.includes(hostAppLocation) ? 'local' : 'global';
          },
        },
        sourceMap: !isProduction(),
      },
      publicAssetURL: '/',
      webpackConfig: {
        module: {
          rules: [
            {
              exclude: /node_modules/,
              test: /\.css$/i,
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: !isProduction(),
                    postcssOptions: {
                      config: './postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    splitAtRoutes: ['album', 'dashboard', 'form', 'products'],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticComponents: true,
    staticHelpers: true,
    staticModifiers: true,
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
