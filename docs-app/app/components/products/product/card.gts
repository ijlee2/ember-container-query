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
      data-test-product-card
      class={{styles.container}}
    >
      <header class={{styles.header}}>
        <h2 data-test-field="Name" class={{styles.name}}>
          {{@product.name}}
        </h2>
      </header>

      <div class={{styles.image-container}}>
        <ProductsProductImage @src={{@product.imageUrl}} />
      </div>

      <div class={{styles.body}}>
        <p
          data-test-field="Short Description"
          class={{styles.description}}
        >
          {{@product.shortDescription}}
        </p>

        <p data-test-field="Price" class={{styles.price}}>
          &#36;{{@product.price}}
        </p>
      </div>

      <div class={{styles.actions}}>
        <LinkTo
          @model={{@product.id}}
          @route={{@redirectTo}}
          data-test-link="Learn More"
          class={{styles.link}}
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
