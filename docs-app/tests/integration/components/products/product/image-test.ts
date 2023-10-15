import { render, type TestContext } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | products/product/image', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a placeholder in test environment', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Products::Product::Image
        @src="https://images.pexels.com/photos/1229942/pexels-photo-1229942.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256"
      />
    `);

    assert.dom('img').doesNotExist('We should not make a network request.');
  });
});
