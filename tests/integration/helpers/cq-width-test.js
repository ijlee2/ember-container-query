import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Helper | cq-width', function (hooks) {
  setupRenderingTest(hooks);

  test('can return a hash with default values', async function (assert) {
    await render(hbs`
      {{#let (cq-width) as |output|}}
        <p data-test-value="dimension">{{output.dimension}}</p>
        <p data-test-value="min">{{output.min}}</p>
        <p data-test-value="max">{{output.max}}</p>
      {{/let}}
    `);

    assert.dom('[data-test-value="dimension"]').hasText('width');
    assert.dom('[data-test-value="min"]').hasText('0');
    assert.dom('[data-test-value="max"]').hasText('Infinity');
  });

  test('if min and max are provided, returns them as they are', async function (assert) {
    await render(hbs`
      {{#let (cq-width min=100 max=200) as |output|}}
        <p data-test-value="dimension">{{output.dimension}}</p>
        <p data-test-value="min">{{output.min}}</p>
        <p data-test-value="max">{{output.max}}</p>
      {{/let}}
    `);

    assert.dom('[data-test-value="dimension"]').hasText('width');
    assert.dom('[data-test-value="min"]').hasText('100');
    assert.dom('[data-test-value="max"]').hasText('200');
  });
});
