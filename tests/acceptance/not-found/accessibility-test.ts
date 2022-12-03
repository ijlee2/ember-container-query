import { visit } from '@ember/test-helpers';
import { setupApplicationTest, timeout } from 'dummy/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

module('Acceptance | not-found', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await visit('/404');
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
