import { find } from '@ember/test-helpers';

type DataAttributes = Record<string, string | undefined>;

export function assertDataAttributes(
  assert: Assert,
  dataAttributes: DataAttributes = {},
): void {
  const containerQuery = find('[data-test-container-query]');

  for (const [dataAttributeName, expectedValue] of Object.entries(
    dataAttributes,
  )) {
    switch (expectedValue) {
      case undefined: {
        assert
          .dom(containerQuery)
          .doesNotHaveAttribute(
            dataAttributeName,
            `The container doesn't have the attribute "${dataAttributeName}".`,
          );

        break;
      }

      default: {
        assert
          .dom(containerQuery)
          .hasAttribute(
            dataAttributeName,
            expectedValue,
            `The container has the attribute "${dataAttributeName}".`,
          );
      }
    }
  }
}
