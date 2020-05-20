import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | album', function(hooks) {
  setupApplicationTest(hooks);

  test('Album example', async function(assert) {
    await visit('/album');

    assert.ok(true);
  });
});