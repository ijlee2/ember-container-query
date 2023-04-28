import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { Model } from '../routes/products';
import styles from './products.css';

type SupportedKey = 'name';

export default class ProductsController extends Controller {
  declare model: Model;

  styles = styles;

  @tracked name: string | null = null;

  get isPartOfNestProductDetailsExperiment() {
    return true;
  }

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

  @action noOp({ key, value }: { key: string; value: any }) {
    if (value === undefined || value === '') {
      this[key as SupportedKey] = null;

      return;
    }

    this[key as SupportedKey] = value;
  }
}
