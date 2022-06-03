import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-2', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(hbs`
      <Widgets::Widget-2 />
    `);

    assert.dom('[data-test-visualization]').exists('We see the visualization.');

    assert.dom('[data-test-captions]').exists('We see the captions.');
  });
});
