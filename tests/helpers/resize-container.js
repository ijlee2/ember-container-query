import { assert } from '@ember/debug';
import { later } from '@ember/runloop';
import { find } from '@ember/test-helpers';

// This is a magic number. It is the time (in ms) for things to `settle`
// after a resize. It is the time that we need to wait before assertions
// that should pass will always pass.
const RERENDER_TIME = 100;


export function timeout(milliseconds) {
  return new Promise(resolve => {
    later(resolve, milliseconds);
  });
}


export default async function resizeContainer(width, height) {
  let parentElement = find('[data-test-parent-element]');

  assert(
    'Please create a parent element with the test selector `data-test-parent-element`.',
    !!parentElement
  );

  // Since <ContainerQuery> has a style of `height: 100%; width: 100%;`,
  // we can set its parent element's width and height to cause container
  // queries to be evaluated.
  parentElement.style.width = `${width}px`;
  parentElement.style.height = `${height}px`;

  await timeout(RERENDER_TIME);
}