import { assert } from '@ember/debug';
import { later } from '@ember/runloop';
import { find } from '@ember/test-helpers';

const timeout = milliseconds => {
  return new Promise(resolve => {
    later(resolve, milliseconds);
  });
};

const rerenderTime = 100;

export default async function resizeWindow(width, height) {
  let parentElement = find('[data-test-parent-element]');

  assert(
    'Please create a parent element with the test selector `data-test-parent-element`.',
    !!parentElement
  );

  parentElement.style.width = `${width}px`;
  parentElement.style.height = `${height}px`;

  await timeout(rerenderTime);
}