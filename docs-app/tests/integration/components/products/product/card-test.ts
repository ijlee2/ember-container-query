import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import type { Product } from 'docs-app/data';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  product: Product;
}

module('Integration | Component | products/product/card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.product = {
      categoryId: 'cake',
      description: 'Made with organic herbs',
      id: '1',
      imageUrl: '',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    };
  });

  test('it renders', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Products::Product::Card
        @product={{this.product}}
        @redirectTo="products.product"
      />
    `);

    assert
      .dom('[data-test-field="Name"]')
      .hasText('Vanilla Ice Cream Cake', 'We see the product name.');

    assert
      .dom('[data-test-field="Short Description"]')
      .hasText(
        'Made with organic herbs',
        'We see the product short description.',
      );

    assert
      .dom('[data-test-field="Price"]')
      .hasText('$40', 'We see the product price.');

    assert
      .dom('[data-test-link="Learn More"]')
      .hasTagName('a', 'We see the correct tag name.')
      .hasText('Learn more', 'We see the learn more link.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });
});
