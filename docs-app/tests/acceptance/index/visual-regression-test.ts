import { visit } from '@ember/test-helpers';
import {
  setupApplicationTest,
  takeSnapshot,
  timeout,
} from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await visit('/');
    await timeout();
  });

  test('@w1 @h1 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w2 @h1 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w3 @h1 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w1 @h2 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w2 @h2 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w3 @h2 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w1 @h3 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w2 @h3 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });

  test('@w3 @h3 Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="ember-container-query"]')
      .exists({ count: 1 }, 'We see the link to ember-container-query.');

    await takeSnapshot(assert);
  });
});
