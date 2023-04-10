import Component from '@glimmer/component';

import type { Product } from '../../../data/products';
import styles from './card.css';

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const ProductsProductCardComponent = class extends Component<ProductsProductCardSignature> {
  styles = styles;
};

export default ProductsProductCardComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
  }
}
