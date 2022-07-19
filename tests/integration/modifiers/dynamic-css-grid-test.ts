import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Modifier | dynamic-css-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('We can dynamically style the CSS grid', async function (assert) {
    await render(hbs`
      <div
        data-test-list="Tracks"
        {{dynamic-css-grid
          numColumns=3
          numRows=4
        }}
      >
      </div>
    `);

    assert.ok(true);
  });
});
