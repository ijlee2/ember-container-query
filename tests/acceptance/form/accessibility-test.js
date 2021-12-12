import { visit } from '@ember/test-helpers';
import resetViewport from 'dummy/tests/helpers/reset-viewport';
import { timeout } from 'dummy/tests/helpers/resize-container';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);
  resetViewport(hooks);

  hooks.beforeEach(async function () {
    await visit('/form');
    await timeout();
  });

  test('@w1 @h1 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w2 @h1 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w3 @h1 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w1 @h2 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w2 @h2 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w3 @h2 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w1 @h3 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w2 @h3 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('@w3 @h3 Accessibility audit', async function (assert) {
    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
