import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Modifier | draw-stacked-chart', function (hooks) {
  setupRenderingTest(hooks);

  test('We can draw a chart', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <div {{draw-stacked-chart}}>
        <svg></svg>
      </div>
    `);

    assert.ok(true);
  });
});
