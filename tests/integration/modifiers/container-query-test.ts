import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Modifier | container-query', function (hooks) {
  setupRenderingTest(hooks);

  test('We can call the modifier without passing arguments', async function (assert) {
    await render(hbs`
      {{!-- template-lint-disable no-inline-styles --}}
      <div
        data-test-parent-element
        style="width: 250px; height: 500px;"
      >
        <div
          style="width: 100%; height: 100%;"
          {{container-query}}
        >
        </div>
      </div>
    `);

    assert.ok(true);
  });
});
