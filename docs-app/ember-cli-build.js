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
          // Enable local mode only for CSS files from the host app
          mode: (resourcePath) => {
            // The host app and active child addons are moved into a common
            // stable temp dir (`options.workspaceDir`), before the `css-loader`
            // processes them.
            //
            // We want to enable local mode only for our own host app. All other
            // addons should be loaded in global mode.
            const hostAppWorkspaceDir = `${options.workspaceDir}/${app.name}`;
            const isHostAppPath = resourcePath.startsWith(hostAppWorkspaceDir);

            return isHostAppPath ? 'local' : 'global';
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
    staticAddonTrees: false, // due to ember-css-modules
    staticComponents: false, // due to ember-css-modules
    staticHelpers: true,
    staticModifiers: true,
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
