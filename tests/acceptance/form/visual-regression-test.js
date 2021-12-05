import { visit } from '@ember/test-helpers';
import takeSnapshot from 'dummy/tests/helpers/percy';
import resetViewport from 'dummy/tests/helpers/reset-viewport';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);
  resetViewport(hooks);

  test('@w1 @h1 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w2 @h1 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w3 @h1 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w1 @h2 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w2 @h2 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w3 @h2 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w1 @h3 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w2 @h3 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });

  test('@w3 @h3 Visual snapshot', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });
});
