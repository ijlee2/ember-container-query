import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import { ContainerQuery, width } from 'ember-container-query';

import type { Product } from '../../../data/products';
import styles from './card.css';
import ProductsProductImage from './image';

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const ProductsProductCardComponent: TOC<ProductsProductCardSignature> =
  <template>
    <ContainerQuery
      @features={{hash wide=(width min=320)}}
      @tagName="article"
      class={{styles.container}}
      data-test-product-card
    >
      <header class={{styles.header}}>
        <h2 class={{styles.name}} data-test-field="Name">
          {{@product.name}}
        </h2>
      </header>

      <div class={{styles.image-container}}>
        <ProductsProductImage @src={{@product.imageUrl}} />
      </div>

      <div class={{styles.body}}>
        <p
          class={{styles.description}}
          data-test-field="Short Description"
        >
          {{@product.shortDescription}}
        </p>

        <p class={{styles.price}} data-test-field="Price">
          \${{@product.price}}
        </p>
      </div>

      <div class={{styles.actions}}>
        <LinkTo
          @model={{@product.id}}
          @route={{@redirectTo}}
          class={{styles.link}}
          data-test-link="Learn More"
        >
          Learn more
        </LinkTo>
      </div>
    </ContainerQuery>
  </template>

export default ProductsProductCardComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Products::Product::Card': typeof ProductsProductCardComponent;
  }
}
