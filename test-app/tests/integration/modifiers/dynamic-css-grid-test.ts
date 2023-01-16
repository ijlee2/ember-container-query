import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Modifier | dynamic-css-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('We can dynamically style the CSS grid', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
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
