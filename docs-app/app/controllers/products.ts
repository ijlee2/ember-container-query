import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type { Model } from 'docs-app/routes/products';

export default class ProductsController extends Controller {
  declare model: Model;

  @tracked name: string | null = null;

  get filteredProducts() {
    const { model: products, name } = this;

    if (!name) {
      return products;
    }

    const target = name.toLowerCase();

    return products.filter((product) => {
      const productName = (product.name ?? '').toLowerCase();

      return productName.includes(target);
    });
  }

  get isPartOfNestProductDetailsExperiment() {
    return true;
  }

  @action updateQueryParameters({ key, value }: { key: string; value: any }) {
    if (key !== 'name') {
      return;
    }

    if (value === undefined || value === '') {
      this[key] = null;

      return;
    }

    this[key] = value;
  }
}
