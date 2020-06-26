import { find } from '@ember/test-helpers';

export default function setupContainerQueryTest(hooks) {
  hooks.beforeEach(setupCustomAssertions);
  hooks.afterEach(cleanupCustomAssertions);
}


function setupCustomAssertions(assert) {
  assert.areFeaturesCorrect = (features = {}) => {
    for (const [featureName, meetsFeature] of Object.entries(features)) {
      switch (meetsFeature) {
        case true: {
          assert.dom(`[data-test-feature="${featureName}"]`)
            .hasText(
              'true',
              `The container meets the feature "${featureName}".`
            );

          break;
        }

        case false: {
          assert.dom(`[data-test-feature="${featureName}"]`)
            .hasText(
              'false',
              `The container doesn't meet the feature "${featureName}".`
            );

          break;
        }

        case undefined: {
          assert.dom(`[data-test-feature="${featureName}"]`)
            .hasNoText(`The container doesn't meet the feature "${featureName}".`);

          break;
        }
      }
    }
  };


  assert.areDimensionsCorrect = (expectedWidth, expectedHeight) => {
    assert.dom('[data-test-width-height]')
      .hasText(
        `${expectedWidth} x ${expectedHeight}`,
        'Width and height are correct.'
      );

    const aspectRatio = Number(find('[data-test-aspect-ratio]').textContent.trim());
    const expectedAspectRatio = expectedWidth / expectedHeight;
    const tolerance = 0.001;

    if (expectedAspectRatio === Infinity) {
      assert.strictEqual(
        aspectRatio === expectedAspectRatio,
        true,
        'Aspect ratio is correct.'
      );

    } else {
      assert.strictEqual(
        Math.abs(aspectRatio - expectedAspectRatio) / Math.abs(expectedAspectRatio) < tolerance,
        true,
        'Aspect ratio is correct.'
      );

    }
  };


  assert.areDataAttributesCorrect = (dataAttributes = {}) => {
    const containerQuery = find('[data-test-container-query]');

    for (const [dataAttributeName, expectedValue] of Object.entries(dataAttributes)) {
      switch (expectedValue) {
        case undefined: {
          assert.dom(containerQuery)
            .doesNotHaveAttribute(
              dataAttributeName,
              `The container doesn't have the attribute "${dataAttributeName}".`
            );

          break;
        }

        default: {
          assert.dom(containerQuery)
            .hasAttribute(
              dataAttributeName,
              expectedValue,
              `The container has the attribute "${dataAttributeName}".`
            );
        }
      }
    }
  };
}


function cleanupCustomAssertions(assert) {
  delete assert.areFeaturesCorrect;
  delete assert.areDimensionsCorrect;
  delete assert.areDataAttributesCorrect;
}