import { set } from '@ember/object';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import type { CustomAssert } from 'dummy/tests/helpers/container-query';
import setupContainerQueryTest from 'dummy/tests/helpers/container-query';
import resizeContainer, { timeout } from 'dummy/tests/helpers/resize-container';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  features?: {
    [featureName: string]: {
      dimension: 'aspectRatio' | 'height' | 'width';
      max: number;
      min: number;
    };
  };
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);
  setupContainerQueryTest(hooks);

  module('When @features is undefined', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
        {{!-- template-lint-disable no-inline-styles --}}
        <div
          data-test-parent-element
          style="width: 250px; height: 500px;"
        >
          <ContainerQuery
            as |CQ|
          >
            <p data-test-feature="small">{{CQ.features.small}}</p>
            <p data-test-feature="medium">{{CQ.features.medium}}</p>
            <p data-test-feature="large">{{CQ.features.large}}</p>

            <p data-test-feature="short">{{CQ.features.short}}</p>
            <p data-test-feature="tall">{{CQ.features.tall}}</p>

            <p data-test-feature="ratio-type-A">{{CQ.features.ratio-type-A}}</p>
            <p data-test-feature="ratio-type-B">{{CQ.features.ratio-type-B}}</p>
            <p data-test-feature="ratio-type-C">{{CQ.features.ratio-type-C}}</p>

            <p data-test-width-height>{{CQ.dimensions.width}} x {{CQ.dimensions.height}}</p>
            <p data-test-aspect-ratio>{{CQ.dimensions.aspectRatio}}</p>
          </ContainerQuery>
        </div>
      `);

      await timeout();
    });

    test('The component renders', async function (assert: CustomAssert) {
      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined,
      });

      assert.areDimensionsCorrect!(250, 500);
    });

    test('The component updates features when it is resized', async function (assert: CustomAssert) {
      await resizeContainer(500, 300);

      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined,
      });

      await resizeContainer(800, 400);

      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined,
      });

      await resizeContainer(1000, 600);

      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined,
      });
    });

    test('The component updates dimensions when it is resized', async function (assert: CustomAssert) {
      await resizeContainer(500, 300);

      assert.areDimensionsCorrect!(500, 300);

      await resizeContainer(800, 400);

      assert.areDimensionsCorrect!(800, 400);

      await resizeContainer(1000, 600);

      assert.areDimensionsCorrect!(1000, 600);
    });
  });

  module('When @features is passed', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
        {{!-- template-lint-disable no-inline-styles --}}
        <div
          data-test-parent-element
          style="width: 250px; height: 500px;"
        >
          <ContainerQuery
            @features={{hash
              small=(cq-width max=300)
              medium=(cq-width min=300 max=600)
              large=(cq-width min=600 max=900)
              short=(cq-height max=500)
              tall=(cq-height min=500)
              ratio-type-A=(cq-aspect-ratio min=0.25 max=0.75)
              ratio-type-B=(cq-aspect-ratio min=0.5 max=1.5)
              ratio-type-C=(cq-aspect-ratio min=1.25 max=2)
            }}
            as |CQ|
          >
            <p data-test-feature="small">{{CQ.features.small}}</p>
            <p data-test-feature="medium">{{CQ.features.medium}}</p>
            <p data-test-feature="large">{{CQ.features.large}}</p>

            <p data-test-feature="short">{{CQ.features.short}}</p>
            <p data-test-feature="tall">{{CQ.features.tall}}</p>

            <p data-test-feature="ratio-type-A">{{CQ.features.ratio-type-A}}</p>
            <p data-test-feature="ratio-type-B">{{CQ.features.ratio-type-B}}</p>
            <p data-test-feature="ratio-type-C">{{CQ.features.ratio-type-C}}</p>

            <p data-test-width-height>{{CQ.dimensions.width}} x {{CQ.dimensions.height}}</p>
            <p data-test-aspect-ratio>{{CQ.dimensions.aspectRatio}}</p>
          </ContainerQuery>
        </div>
      `);

      await timeout();
    });

    test('The component renders', async function (assert: CustomAssert) {
      assert.areFeaturesCorrect!({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false,
      });

      assert.areDimensionsCorrect!(250, 500);
    });

    test('The component updates features when it is resized', async function (assert: CustomAssert) {
      await resizeContainer(500, 300);

      assert.areFeaturesCorrect!({
        small: false,
        medium: true,
        large: false,
        short: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': true,
      });

      await resizeContainer(800, 400);

      assert.areFeaturesCorrect!({
        small: false,
        medium: false,
        large: true,
        short: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': false,
      });

      await resizeContainer(1000, 600);

      assert.areFeaturesCorrect!({
        small: false,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': true,
      });
    });

    test('The component updates dimensions when it is resized', async function (assert: CustomAssert) {
      await resizeContainer(500, 300);

      assert.areDimensionsCorrect!(500, 300);

      await resizeContainer(800, 400);

      assert.areDimensionsCorrect!(800, 400);

      await resizeContainer(1000, 600);

      assert.areDimensionsCorrect!(1000, 600);
    });
  });

  module('When @features is updated', function (hooks) {
    hooks.beforeEach(async function (this: TestContext) {
      this.features = {
        small: {
          dimension: 'width',
          min: 0,
          max: 300,
        },
        medium: {
          dimension: 'width',
          min: 300,
          max: 600,
        },
        short: {
          dimension: 'height',
          min: 0,
          max: 500,
        },
        'ratio-type-C': {
          dimension: 'aspectRatio',
          min: 1.25,
          max: 2,
        },
      };

      await render(hbs`
        {{!-- template-lint-disable no-inline-styles --}}
        <div
          data-test-parent-element
          style="width: 250px; height: 500px;"
        >
          <ContainerQuery
            @features={{this.features}}
            as |CQ|
          >
            <p data-test-feature="small">{{CQ.features.small}}</p>
            <p data-test-feature="medium">{{CQ.features.medium}}</p>
            <p data-test-feature="large">{{CQ.features.large}}</p>

            <p data-test-feature="short">{{CQ.features.short}}</p>
            <p data-test-feature="tall">{{CQ.features.tall}}</p>

            <p data-test-feature="ratio-type-A">{{CQ.features.ratio-type-A}}</p>
            <p data-test-feature="ratio-type-B">{{CQ.features.ratio-type-B}}</p>
            <p data-test-feature="ratio-type-C">{{CQ.features.ratio-type-C}}</p>

            <p data-test-width-height>{{CQ.dimensions.width}} x {{CQ.dimensions.height}}</p>
            <p data-test-aspect-ratio>{{CQ.dimensions.aspectRatio}}</p>
          </ContainerQuery>
        </div>
      `);

      await timeout();

      set(this, 'features', {
        large: {
          dimension: 'width',
          min: 600,
          max: 900,
        },
        tall: {
          dimension: 'height',
          min: 500,
          max: Infinity,
        },
        'ratio-type-A': {
          dimension: 'aspectRatio',
          min: 0.25,
          max: 0.75,
        },
        'ratio-type-B': {
          dimension: 'aspectRatio',
          min: 0.5,
          max: 1.5,
        },
      });
    });

    test('The component updates the features', async function (assert: CustomAssert) {
      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assert.areFeaturesCorrect!({
        large: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
      });
    });

    test('The component updates features when it is resized', async function (assert: CustomAssert) {
      await resizeContainer(500, 300);

      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assert.areFeaturesCorrect!({
        large: false,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
      });

      await resizeContainer(800, 400);

      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assert.areFeaturesCorrect!({
        large: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
      });

      await resizeContainer(1000, 600);

      assert.areFeaturesCorrect!({
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assert.areFeaturesCorrect!({
        large: false,
        tall: true,
        'ratio-type-A': false,
        'ratio-type-B': false,
      });
    });
  });
});
