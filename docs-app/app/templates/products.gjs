import { array, hash } from '@ember/helper';
import ProductsProductCard from 'docs-app/components/products/product/card';
import UiFormInput from 'docs-app/components/ui/form/input';
import UiPage from 'docs-app/components/ui/page';
import { pageTitle } from 'ember-page-title';
import { local } from 'embroider-css-modules';

<template>
  {{pageTitle "Products"}}

  <UiPage @title="Products">
    <div
      class={{local
        @controller.styles
        (if
          @controller.isPartOfNestProductDetailsExperiment
          (array "shared-layout" "products-with-details")
          (array "shared-layout" "products")
        )
        "sticky-container"
      }}
    >
      <div class={{@controller.styles.filters}}>
        <div class={{@controller.styles.filter}}>
          <UiFormInput
            @changeset={{hash name=@controller.name}}
            @key="name"
            @label="Filter by"
            @onUpdate={{@controller.updateQueryParameters}}
            @placeholder="Cake, pasta, etc."
          />
        </div>
      </div>

      <div class={{@controller.styles.list}}>
        {{#each @controller.filteredProducts as |product|}}
          <ProductsProductCard @product={{product}} />
        {{else}}
          <p>
            No products found.
          </p>
        {{/each}}
      </div>

      <div class={{@controller.styles.product-details}}>
        {{outlet}}
      </div>
    </div>
  </UiPage>
</template>
