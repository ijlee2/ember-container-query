import templateOnlyComponent from '@ember/component/template-only';

import type { Product } from '../../../data/products';

interface ProductsProductCardComponentSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const ProductsProductCardComponent =
  templateOnlyComponent<ProductsProductCardComponentSignature>();

export default ProductsProductCardComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
  }
}
