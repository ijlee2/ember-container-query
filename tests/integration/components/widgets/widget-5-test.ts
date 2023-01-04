import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | widgets/widget-5', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Widgets::Widget-5 />
    `);

    assert
      .dom('[data-test-call-to-action]')
      .hasText(
        'What will you create with ember-container-query ?',
        'We see the correct text for call-to-action.'
      );
  });
});
