import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | draw-chart', function (hooks) {
  setupRenderingTest(hooks);

  test('We can draw a chart', async function (assert) {
    await render(hbs`
      <div {{draw-chart}}>
        <svg></svg>
      </div>
    `);

    assert.ok(true);
  });
});
