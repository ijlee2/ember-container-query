import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type { Product } from 'docs-app/data/products';
import type { Model } from 'docs-app/routes/products';

export default class ProductsController extends Controller {
  declare model: Model;

  @tracked name: string | null = null;

  get filteredProducts(): Product[] {
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

  get isPartOfNestProductDetailsExperiment(): boolean {
    return true;
  }

  @action updateQueryParameters({
    key,
    value,
  }: {
    key: string;
    value: any;
  }): void {
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
