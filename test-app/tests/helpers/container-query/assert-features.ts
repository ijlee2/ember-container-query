type Features = Record<string, boolean | undefined>;

export function assertFeatures(assert: Assert, features: Features = {}): void {
  for (const [featureName, meetsFeature] of Object.entries(features)) {
    switch (meetsFeature) {
      case true: {
        assert
          .dom(`[data-test-feature="${featureName}"]`)
          .hasText('true', `The container meets the feature "${featureName}".`);

        break;
      }

      case false: {
        assert
          .dom(`[data-test-feature="${featureName}"]`)
          .hasText(
            'false',
            `The container doesn't meet the feature "${featureName}".`,
          );

        break;
      }

      case undefined: {
        assert
          .dom(`[data-test-feature="${featureName}"]`)
          .hasNoText(
            `The container doesn't meet the feature "${featureName}".`,
          );

        break;
      }
    }
  }
}
