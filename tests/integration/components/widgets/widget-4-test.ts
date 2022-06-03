import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-4', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(hbs`
      <Widgets::Widget-4 />
    `);

    assert
      .dom('[data-test-link="All memos"]')
      .exists('We see the All memos link.');
  });
});
