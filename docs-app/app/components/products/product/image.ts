import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

import styles from './image.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

export default class ProductsProductImageComponent extends Component<ProductsProductImageSignature> {
  styles = styles;

  get isTestEnvironment() {
    return config.environment === 'test';
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
  }
}
