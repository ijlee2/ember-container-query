import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import concertData from 'test-app/data/concert';
import type { ContainerDimensions } from 'test-app/utils/components/widgets/widget-3';
import { findBestFittingImage } from 'test-app/utils/components/widgets/widget-3';
import { module, test } from 'qunit';

type TestMatrix = Map<string, ContainerDimensions>;

interface TestContext extends BaseTestContext {
  testMatrix: TestMatrix;
}

module('Unit | Utility | components/widgets/widget-3', function () {
  module('findBestFittingImage', function (hooks) {
    hooks.beforeEach(function (this: TestContext) {
      const aspectRatios = [0.5, 1, 1.5, 2, 3, 4, 6];
      const heights = [100, 200, 300, 500, 800];

      // Create a test matrix of height and width
      const testMatrix = new Map() as TestMatrix;

      aspectRatios.forEach((aspectRatio) => {
        heights.forEach((height) => {
          const width = aspectRatio * height;
          const key = `h${height},w${width}`;

          testMatrix.set(key, { aspectRatio, height, width });
        });
      });

      this.testMatrix = testMatrix;
    });

    module('When images is an empty array', function () {
      test('returns undefined', function (this: TestContext, assert) {
        const containerDimensions = this.testMatrix.get('h100,w100')!;

        assert.strictEqual(
          findBestFittingImage([], containerDimensions),
          undefined
        );
      });
    });

    module('When images is an array with 1 element', function () {
      test("returns the only image regardless of the container's dimensions", function (this: TestContext, assert) {
        assert.expect(35);

        const images = [
          {
            url: '/images/widgets/widget-3/venue-square@2x.jpg',
            metadata: {
              height: 300,
              width: 300,
            },
          },
        ];

        const expectedUrls = new Map([
          ['h100,w50', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h200,w100', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w150', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w250', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h800,w400', '/images/widgets/widget-3/venue-square@2x.jpg'],

          ['h100,w100', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h200,w200', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w300', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w500', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h800,w800', '/images/widgets/widget-3/venue-square@2x.jpg'],

          ['h100,w150', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h200,w300', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w450', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w750', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h800,w1200', '/images/widgets/widget-3/venue-square@2x.jpg'],

          ['h100,w200', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h200,w400', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w600', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w1000', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h800,w1600', '/images/widgets/widget-3/venue-square@2x.jpg'],

          ['h100,w300', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h200,w600', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w900', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w1500', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h800,w2400', '/images/widgets/widget-3/venue-square@2x.jpg'],

          ['h100,w400', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h200,w800', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w1200', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w2000', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h800,w3200', '/images/widgets/widget-3/venue-square@2x.jpg'],

          ['h100,w600', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h200,w1200', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w1800', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w3000', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h800,w4800', '/images/widgets/widget-3/venue-square@2x.jpg'],
        ]);

        this.testMatrix.forEach((containerDimensions, key) => {
          assert.strictEqual(
            findBestFittingImage(images, containerDimensions),
            expectedUrls.get(key),
            `Container dimensions: ${key}`
          );
        });
      });
    });

    module('When images is an array with more than 1 element', function () {
      test('returns the image that fits the container well', function (this: TestContext, assert) {
        assert.expect(35);

        const images = concertData.images;

        const expectedUrls = new Map([
          ['h100,w50', '/images/widgets/widget-3/venue-square@1x.jpg'],
          ['h200,w100', '/images/widgets/widget-3/venue-square@1x.jpg'],
          ['h300,w150', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w250', '/images/widgets/widget-3/venue-square@4x.jpg'],
          ['h800,w400', '/images/widgets/widget-3/venue-square@4x.jpg'],

          ['h100,w100', '/images/widgets/widget-3/venue-square@1x.jpg'],
          ['h200,w200', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w300', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h500,w500', '/images/widgets/widget-3/venue-square@4x.jpg'],
          ['h800,w800', '/images/widgets/widget-3/venue-square@4x.jpg'],

          ['h100,w150', '/images/widgets/widget-3/venue-square@1x.jpg'],
          ['h200,w300', '/images/widgets/widget-3/venue-square@2x.jpg'],
          ['h300,w450', '/images/widgets/widget-3/venue-wide@2x.jpg'],
          ['h500,w750', '/images/widgets/widget-3/venue-wide@4x.jpg'],
          ['h800,w1200', '/images/widgets/widget-3/venue-wide@4x.jpg'],

          ['h100,w200', '/images/widgets/widget-3/venue-wide@1x.jpg'],
          ['h200,w400', '/images/widgets/widget-3/venue-wide@2x.jpg'],
          ['h300,w600', '/images/widgets/widget-3/venue-wide@2x.jpg'],
          ['h500,w1000', '/images/widgets/widget-3/venue-wide@4x.jpg'],
          ['h800,w1600', '/images/widgets/widget-3/venue-wide@4x.jpg'],

          ['h100,w300', '/images/widgets/widget-3/venue-extra-wide@1x.jpg'],
          ['h200,w600', '/images/widgets/widget-3/venue-extra-wide@2x.jpg'],
          ['h300,w900', '/images/widgets/widget-3/venue-extra-wide@2x.jpg'],
          ['h500,w1500', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],
          ['h800,w2400', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],

          ['h100,w400', '/images/widgets/widget-3/venue-extra-wide@1x.jpg'],
          ['h200,w800', '/images/widgets/widget-3/venue-extra-wide@2x.jpg'],
          ['h300,w1200', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],
          ['h500,w2000', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],
          ['h800,w3200', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],

          ['h100,w600', '/images/widgets/widget-3/venue-extra-wide@2x.jpg'],
          ['h200,w1200', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],
          ['h300,w1800', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],
          ['h500,w3000', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],
          ['h800,w4800', '/images/widgets/widget-3/venue-extra-wide@4x.jpg'],
        ]);

        this.testMatrix.forEach((containerDimensions, key) => {
          assert.strictEqual(
            findBestFittingImage(images, containerDimensions),
            expectedUrls.get(key),
            `Container dimensions: ${key}`
          );
        });
      });
    });
  });
});
