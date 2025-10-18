import Route from '@ember/routing/route';
import { type Product, products } from 'docs-app/data/products';
import type { ModelFrom } from 'docs-app/utils/routes';

export default class ProductsRoute extends Route {
  model(): Product[] {
    return products;
  }
}

export type Model = ModelFrom<ProductsRoute>;
