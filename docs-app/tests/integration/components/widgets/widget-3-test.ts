import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | widgets/widget-3', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Widgets::Widget-3 />
    `);

    assert.dom('[data-test-tour-schedule]').exists('We see the tour schedule.');
  });
});
