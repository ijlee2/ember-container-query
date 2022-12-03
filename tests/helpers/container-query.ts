import { find } from '@ember/test-helpers';

type DataAttributes = {
  [dataAttributeName: string]: string | undefined;
};

type Dimensions = {
  height: number;
  width: number;
};

type Features = {
  [featureName: string]: boolean | undefined;
};

export interface CustomAssert extends Assert {
  areDataAttributesCorrect?: (dataAttributes: DataAttributes) => void;
  areDimensionsCorrect?: (dimensions: Dimensions) => void;
  areFeaturesCorrect?: (features: Features) => void;
}

export function setupContainerQueryTest(hooks: NestedHooks): void {
  hooks.beforeEach(setupCustomAssertions);
  hooks.afterEach(cleanupCustomAssertions);
}

function setupCustomAssertions(assert: CustomAssert): void {
  assert.areDataAttributesCorrect = (dataAttributes = {}) => {
    const containerQuery = find('[data-test-container-query]');

    for (const [dataAttributeName, expectedValue] of Object.entries(
      dataAttributes
    )) {
      switch (expectedValue) {
        case undefined: {
          assert
            .dom(containerQuery)
            .doesNotHaveAttribute(
              dataAttributeName,
              `The container doesn't have the attribute "${dataAttributeName}".`
            );

          break;
        }

        default: {
          assert
            .dom(containerQuery)
            .hasAttribute(
              dataAttributeName,
              expectedValue,
              `The container has the attribute "${dataAttributeName}".`
            );
        }
      }
    }
  };

  assert.areDimensionsCorrect = (dimensions) => {
    const { height: expectedHeight, width: expectedWidth } = dimensions;

    // Check width and height
    assert
      .dom('[data-test-width-height]')
      .hasText(
        `${expectedWidth} x ${expectedHeight}`,
        'Width and height are correct.'
      );

    // Check aspect ratio
    const targetElement = find('[data-test-aspect-ratio]') as HTMLElement;

    const aspectRatio = parseFloat(targetElement.textContent!.trim());
    const expectedAspectRatio = expectedWidth / expectedHeight;
    const tolerance = 0.001;

    if (expectedAspectRatio === Infinity) {
      assert.true(
        aspectRatio === expectedAspectRatio,
        'Aspect ratio is correct.'
      );

      return;
    }

    const relativeError =
      Math.abs(aspectRatio - expectedAspectRatio) /
      Math.abs(expectedAspectRatio);

    assert.true(relativeError < tolerance, 'Aspect ratio is correct.');
  };

  assert.areFeaturesCorrect = (features = {}) => {
    for (const [featureName, meetsFeature] of Object.entries(features)) {
      switch (meetsFeature) {
        case true: {
          assert
            .dom(`[data-test-feature="${featureName}"]`)
            .hasText(
              'true',
              `The container meets the feature "${featureName}".`
            );

          break;
        }

        case false: {
          assert
            .dom(`[data-test-feature="${featureName}"]`)
            .hasText(
              'false',
              `The container doesn't meet the feature "${featureName}".`
            );

          break;
        }

        case undefined: {
          assert
            .dom(`[data-test-feature="${featureName}"]`)
            .hasNoText(
              `The container doesn't meet the feature "${featureName}".`
            );

          break;
        }
      }
    }
  };
}

function cleanupCustomAssertions(assert: CustomAssert): void {
  delete assert.areDataAttributesCorrect;
  delete assert.areDimensionsCorrect;
  delete assert.areFeaturesCorrect;
}
