import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-2', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template>
    <Widgets::Widget-2 />
    </template>);

    assert.ok(true);
  });
});
