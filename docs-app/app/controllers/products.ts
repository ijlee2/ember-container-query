import Controller from '@ember/controller';

import type { Model } from '../routes/products';

export default class ProductsController extends Controller {
  declare model: Model;
}
