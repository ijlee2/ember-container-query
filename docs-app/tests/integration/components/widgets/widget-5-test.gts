import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-5', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template>
    <Widgets::Widget-5 />
    </template>);

    assert
      .dom('[data-test-call-to-action]')
      .hasText(
        'What will you create with ember-container-query ?',
        'We see the correct text for call-to-action.',
      );
  });
});
