import type { TestContext } from '@ember/test-helpers';
import { getDeprecations, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Helper | cq-aspect-ratio', function (hooks) {
  setupRenderingTest(hooks);

  test('provides a deprecation message', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{#let (cq-aspect-ratio) as |output|}}
        <p data-test-value="dimension">{{output.dimension}}</p>
        <p data-test-value="min">{{output.min}}</p>
        <p data-test-value="max">{{output.max}}</p>
      {{/let}}
    `);

    assert.dom('[data-test-value="dimension"]').hasText('aspectRatio');
    assert.dom('[data-test-value="min"]').hasText('0');
    assert.dom('[data-test-value="max"]').hasText('Infinity');

    const deprecationMessages = getDeprecations().map(({ message }) => message);

    assert.deepEqual(deprecationMessages, [
      'The {{cq-aspect-ratio}} helper has been renamed to {{aspect-ratio}}. Please update the helper name in your template.',
    ]);
  });
});
