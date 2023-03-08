/* eslint-disable qunit/require-expect */
import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest, takeSnapshot, timeout } from '../../helpers';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await visit('/products');
    await timeout();
  });

  test('@w1 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w2 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w3 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w1 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w2 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w3 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w1 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w2 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });

  test('@w3 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await takeSnapshot(assert);
  });
});
