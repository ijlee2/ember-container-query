import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-5', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{! @glint-nocheck: not typesafe yet }}
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
