import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-4', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template>
    <Widgets::Widget-4 />
    </template>);

    assert
      .dom('[data-test-link="All memos"]')
      .exists('We see the All memos link.');
  });
});
