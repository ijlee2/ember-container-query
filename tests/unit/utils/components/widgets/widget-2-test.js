import musicRevenue from 'dummy/data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
  formatRevenue,
} from 'dummy/utils/components/widgets/widget-2';
import { module, test } from 'qunit';

module('Unit | Utility | components/widgets/widget-2', function () {
  module('formatRevenue', function () {
    test('formats a revenue in USD', function (assert) {
      assert.strictEqual(formatRevenue(1.234567), '$1');

      assert.strictEqual(formatRevenue(1.234567e3), '$1,235');

      assert.strictEqual(formatRevenue(1.234567e6), '$1.2 million');

      assert.strictEqual(formatRevenue(1.234567e9), '$1.2 billion');

      assert.strictEqual(formatRevenue(1.234567e12), '$1.2 trillion');
    });
  });

  module('createDataForVisualization', function () {
    test('works', function (assert) {
      const data = createDataForVisualization(musicRevenue);

      assert.strictEqual(data.length, 1058, 'There are 1058 data points.');

      assert.deepEqual(
        data[0],
        {
          musicFormat: '8 - Track',
          year: 1973,
          revenue: 2699600000,
        },
        'We created the first data point correctly.'
      );

      assert.deepEqual(
        data[data.length - 1],
        {
          musicFormat: 'Vinyl Single',
          year: 2018,
          revenue: 5300000,
        },
        'We created the last data point correctly.'
      );
    });
  });

  module('createSummariesForCaptions', function () {
    test('works', function (assert) {
      const data = createDataForVisualization(musicRevenue);
      const summaries = createSummariesForCaptions(data);

      assert.strictEqual(summaries.length, 23, 'There are 23 summaries.');

      assert.deepEqual(
        summaries[0],
        {
          musicFormat: '8 - Track',
          markerColor: '#5B8DB8',
          averageRevenue: '$2.3 billion',
          relevantYears: {
            min: 1973,
            max: 1982,
          },
        },
        'We created the first summary correctly.'
      );

      assert.deepEqual(
        summaries[summaries.length - 1],
        {
          musicFormat: 'Vinyl Single',
          markerColor: '#43719F',
          averageRevenue: '$304.8 million',
          relevantYears: {
            min: 1973,
            max: 2018,
          },
        },
        'We created the last summary correctly.'
      );
    });
  });
});
