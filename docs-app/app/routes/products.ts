import Route from '@ember/routing/route';

import products from '../data/products';
import type { ModelFrom } from '../utils/routes';

export default class ProductsRoute extends Route {
  model() {
    return products;
  }
}

export type Model = ModelFrom<ProductsRoute>;
