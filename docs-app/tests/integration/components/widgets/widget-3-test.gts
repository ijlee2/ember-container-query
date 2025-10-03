import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-3', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template>
    <Widgets::Widget-3 />
    </template>);

    assert.dom('[data-test-tour-schedule]').exists('We see the tour schedule.');
  });
});
