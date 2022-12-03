import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

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
