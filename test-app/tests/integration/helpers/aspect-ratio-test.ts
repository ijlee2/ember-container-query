import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Helper | aspect-ratio', function (hooks) {
  setupRenderingTest(hooks);

  test('can return a hash with default values', async function (assert) {
    await render(hbs`
      {{#let (aspect-ratio) as |output|}}
        <p data-test-value="dimension">{{output.dimension}}</p>
        <p data-test-value="min">{{output.min}}</p>
        <p data-test-value="max">{{output.max}}</p>
      {{/let}}
    `);

    assert.dom('[data-test-value="dimension"]').hasText('aspectRatio');
    assert.dom('[data-test-value="min"]').hasText('0');
    assert.dom('[data-test-value="max"]').hasText('Infinity');
  });

  test('if min and max are provided, returns them as they are', async function (assert) {
    await render(hbs`
      {{#let (aspect-ratio max=0.75 min=0.25) as |output|}}
        <p data-test-value="dimension">{{output.dimension}}</p>
        <p data-test-value="min">{{output.min}}</p>
        <p data-test-value="max">{{output.max}}</p>
      {{/let}}
    `);

    assert.dom('[data-test-value="dimension"]').hasText('aspectRatio');
    assert.dom('[data-test-value="min"]').hasText('0.25');
    assert.dom('[data-test-value="max"]').hasText('0.75');
  });
});
