'use strict';

/*
  The filter expressions mean the following in practice:

  The command `DEVICE='w1-h1' ember test` only runs application tests that are
  not marked with the filter @w2, @w3, @h2, or @h3. In other words, we only run
  application tests that are marked with @w1, @h1, or can be run on all devices.

  The command `DEVICE='w3-h3' ember test` runs all application, rendering, and
  unit tests, as long as they are not marked with @w1, @w2, @h1, or @h2.
*/
const FILTERS = {
  'w1-h1': '/^(?=(.*Acceptance))(?!(.*@w2|.*@w3|.*@h2|.*@h3))/',
  'w2-h1': '/^(?=(.*Acceptance))(?!(.*@w1|.*@w3|.*@h2|.*@h3))/',
  'w3-h1': '/^(?=(.*Acceptance))(?!(.*@w1|.*@w2|.*@h2|.*@h3))/',

  'w1-h2': '/^(?=(.*Acceptance))(?!(.*@w2|.*@w3|.*@h1|.*@h3))/',
  'w2-h2': '/^(?=(.*Acceptance))(?!(.*@w1|.*@w3|.*@h1|.*@h3))/',
  'w3-h2': '/^(?=(.*Acceptance))(?!(.*@w1|.*@w2|.*@h1|.*@h3))/',

  'w1-h3': '/^(?=(.*Acceptance))(?!(.*@w2|.*@w3|.*@h1|.*@h2))/',
  'w2-h3': '/^(?=(.*Acceptance))(?!(.*@w1|.*@w3|.*@h1|.*@h2))/',
  'w3-h3': '/^(?!(.*@w1|.*@w2|.*@h1|.*@h2))/'
};

const WINDOW_SIZES = {
  'w1-h1': { width: 400, height: 300 },
  'w2-h1': { width: 900, height: 300 },
  'w3-h1': { width: 1400, height: 300 },

  'w1-h2': { width: 400, height: 600 },
  'w2-h2': { width: 900, height: 600 },
  'w3-h2': { width: 1400, height: 600 },

  'w1-h3': { width: 400, height: 900 },
  'w2-h3': { width: 900, height: 900 },
  'w3-h3': { width: 1400, height: 900 }
};

const { DEVICE = 'w3-h3' } = process.env;

const filter = encodeURIComponent(FILTERS[DEVICE]);
const { width, height } = WINDOW_SIZES[DEVICE];

module.exports = {
  test_page: `tests/index.html?filter=${filter}&width=${width}&height=${height}&hidepassed&nolint`,
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_start_timeout: 60,
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        `--window-size=${width},${height}`
      ].filter(Boolean),

      dev: [
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        `--window-size=${width},${height}`
      ]
    }
  }
};