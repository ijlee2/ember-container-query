const env = process.env.EMBER_ENV || 'development';

const plugins = [require('autoprefixer')];

if (env === 'production') {
  // ...
}

module.exports = {
  plugins,
};
