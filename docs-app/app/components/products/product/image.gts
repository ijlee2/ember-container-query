import type { TOC } from '@ember/component/template-only';
import config from 'docs-app/config/environment';

import styles from './image.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

const isTestEnvironment = config.environment === 'test';

const ProductsProductImageComponent: TOC<ProductsProductImageSignature> =
  <template>
    {{#if isTestEnvironment}}
      <div class={{styles.placeholder-image}}></div>

    {{else}}
      <img
        alt=""
        class={{styles.image}}
        role="presentation"
        src={{@src}}
      />

    {{/if}}
  </template>

export default ProductsProductImageComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Image': typeof ProductsProductImageComponent;
  }
}
