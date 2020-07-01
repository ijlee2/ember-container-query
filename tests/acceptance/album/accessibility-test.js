import { visit } from '@ember/test-helpers';
import resetViewport from 'dummy/tests/helpers/reset-viewport';
import a11yAudit from 'ember-a11y-testing/test-support/audit';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | album', function(hooks) {
  setupApplicationTest(hooks);
  resetViewport(hooks);

  hooks.beforeEach(function() {
    this.axeOptions = {
      rules: {
        'scrollable-region-focusable': {
          enabled: false
        }
      }
    };
  });


  test('@w1 @h1 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w2 @h1 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w3 @h1 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w1 @h2 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w2 @h2 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w3 @h2 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w1 @h3 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w2 @h3 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });


  test('@w3 @h3 Accessibility audit', async function(assert) {
    await visit('/album');
    await a11yAudit(this.axeOptions);

    assert.ok(true, 'We passed Axe tests.');
  });
});