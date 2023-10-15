import Route from '@ember/routing/route';

import { type Product, products } from '../data';
import type { ModelFrom } from '../utils/routes';

export default class ProductsRoute extends Route {
  model(): Product[] {
    return products;
  }
}

export type Model = ModelFrom<ProductsRoute>;
