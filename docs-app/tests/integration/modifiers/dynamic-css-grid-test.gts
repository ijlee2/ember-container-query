import dynamicCssGrid from 'docs-app/modifiers/dynamic-css-grid';

import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Modifier | dynamic-css-grid', function (hooks) {
  setupRenderingTest(hooks);

  test('We can dynamically style the CSS grid', async function (assert) {
    await render(<template>
    <div data-test-list="Tracks" {{dynamicCssGrid numColumns=3 numRows=4}}>
    </div>
    </template>);

    assert.ok(true);
  });
});
