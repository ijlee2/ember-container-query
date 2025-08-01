import { find } from '@ember/test-helpers';

type Dimensions = {
  height: number;
  width: number;
};

export function assertDimensions(assert: Assert, dimensions: Dimensions): void {
  const { height: expectedHeight, width: expectedWidth } = dimensions;

  // Check width and height
  assert
    .dom('[data-test-width-height]')
    .hasText(
      `${expectedWidth} x ${expectedHeight}`,
      'Width and height are correct.',
    );

  // Check aspect ratio
  const targetElement = find('[data-test-aspect-ratio]') as HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const aspectRatio = parseFloat(targetElement.textContent!.trim());
  const expectedAspectRatio = expectedWidth / expectedHeight;
  const tolerance = 0.001;

  if (expectedAspectRatio === Infinity) {
    assert.true(
      aspectRatio === expectedAspectRatio,
      'Aspect ratio is correct.',
    );

    return;
  }

  const relativeError =
    Math.abs(aspectRatio - expectedAspectRatio) / Math.abs(expectedAspectRatio);

  assert.true(relativeError < tolerance, 'Aspect ratio is correct.');
}
