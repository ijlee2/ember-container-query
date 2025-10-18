import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import ProductsProductCard from 'docs-app/components/products/product/card';
import type { Product } from 'docs-app/data/products';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
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
    const { product } = this;

    await render(
      <template>
        <ProductsProductCard
          @product={{product}}
          @redirectTo="products.product"
        />
      </template>,
    );

    assert.dom('[data-test-field="Name"]').hasText('Vanilla Ice Cream Cake');

    assert
      .dom('[data-test-field="Short Description"]')
      .hasText('Made with organic herbs');

    assert.dom('[data-test-field="Price"]').hasText('$40');

    assert
      .dom('[data-test-link="Learn More"]')
      .hasTagName('a')
      .hasText('Learn more');

    await a11yAudit();
  });
});
