import type { TestContext } from '@ember/test-helpers';
import { findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | widgets/widget-1', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Widgets::Widget-1 />
    `);

    const titles = findAll('[data-test-title]');

    assert.strictEqual(titles.length, 3, 'We see 3 titles.');

    assert
      .dom(titles[0])
      .hasText('Item 1', 'We see the correct text for the 1st title.');

    assert
      .dom(titles[1])
      .hasText('Item 2', 'We see the correct text for the 2nd title.');

    assert
      .dom(titles[2])
      .hasText('Item 3', 'We see the correct text for the 3rd title.');
  });
});
