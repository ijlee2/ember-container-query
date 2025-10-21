import type { TOC } from '@ember/component/template-only';
import config from 'docs-app/config/environment';

import styles from './image.module.css';

const isTestEnvironment = config.environment === 'test';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

const ProductsProductImageComponent: TOC<ProductsProductImageSignature> =
  <template>
    {{#if isTestEnvironment}}
      <div class={{styles.placeholder-image}}></div>

    {{else}}
      {{! template-lint-disable no-redundant-role }}
      <img alt="" class={{styles.image}} role="presentation" src={{@src}} />
      {{! template-lint-enable no-redundant-role }}

    {{/if}}
  </template>;

export default ProductsProductImageComponent;
