import { set } from '@ember/object';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { Features } from 'ember-container-query';
import { module, test } from 'qunit';
import {
  assertDimensions,
  assertFeatures,
  resizeContainer,
  setupRenderingTest,
  timeout,
} from 'test-app/tests/helpers';

type FeatureNames =
  | 'small'
  | 'medium'
  | 'large'
  | 'short'
  | 'tall'
  | 'ratio-type-A'
  | 'ratio-type-B'
  | 'ratio-type-C';

interface TestContext extends BaseTestContext {
  features?: Features<FeatureNames>;
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);

  module('When @features is undefined', function (hooks) {
    hooks.beforeEach(async function () {
      /* @ts-expect-error: We are testing a special case (@features is undefined) */
      this.features = undefined;

      await render<TestContext>(hbs`
        {{! template-lint-disable no-inline-styles }}
        <div data-test-parent-element style="width: 250px; height: 500px;">
          <ContainerQuery
            @features={{this.features}}
            data-test-container-query
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

            <p data-test-width-height>
              {{CQ.dimensions.width}}
              x
              {{CQ.dimensions.height}}
            </p>
            <p data-test-aspect-ratio>{{CQ.dimensions.aspectRatio}}</p>
          </ContainerQuery>
        </div>
      `);

      await timeout();
    });

    test('The component renders', function (this: TestContext, assert) {
      assertFeatures(assert, {
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined,
      });

      assertDimensions(assert, { height: 500, width: 250 });
    });

    test('The component updates features when it is resized', async function (this: TestContext, assert) {
      await resizeContainer({ height: 300, width: 500 });

      assertFeatures(assert, {
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined,
      });

      await resizeContainer({ height: 400, width: 800 });

      assertFeatures(assert, {
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined,
      });

      await resizeContainer({ height: 600, width: 1000 });

      assertFeatures(assert, {
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

    test('The component updates dimensions when it is resized', async function (this: TestContext, assert) {
      await resizeContainer({ height: 300, width: 500 });

      assertDimensions(assert, { height: 300, width: 500 });

      await resizeContainer({ height: 400, width: 800 });

      assertDimensions(assert, { height: 400, width: 800 });

      await resizeContainer({ height: 600, width: 1000 });

      assertDimensions(assert, { height: 600, width: 1000 });
    });
  });

  module('When @features is passed', function (hooks) {
    hooks.beforeEach(async function () {
      await render<TestContext>(hbs`
        {{! template-lint-disable no-inline-styles }}
        <div data-test-parent-element style="width: 250px; height: 500px;">
          <ContainerQuery
            @features={{hash
              large=(width max=900 min=600)
              medium=(width max=600 min=300)
              ratio-type-A=(aspect-ratio max=0.75 min=0.25)
              ratio-type-B=(aspect-ratio max=1.5 min=0.5)
              ratio-type-C=(aspect-ratio max=2 min=1.25)
              short=(height max=500)
              small=(width max=300)
              tall=(height min=500)
            }}
            data-test-container-query
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

            <p data-test-width-height>
              {{CQ.dimensions.width}}
              x
              {{CQ.dimensions.height}}
            </p>
            <p data-test-aspect-ratio>{{CQ.dimensions.aspectRatio}}</p>
          </ContainerQuery>
        </div>
      `);

      await timeout();
    });

    test('The component renders', function (this: TestContext, assert) {
      assertFeatures(assert, {
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false,
      });

      assertDimensions(assert, { height: 500, width: 250 });
    });

    test('The component updates features when it is resized', async function (this: TestContext, assert) {
      await resizeContainer({ height: 300, width: 500 });

      assertFeatures(assert, {
        small: false,
        medium: true,
        large: false,
        short: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': true,
      });

      await resizeContainer({ height: 400, width: 800 });

      assertFeatures(assert, {
        small: false,
        medium: false,
        large: true,
        short: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': false,
      });

      await resizeContainer({ height: 600, width: 1000 });

      assertFeatures(assert, {
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

    test('The component updates dimensions when it is resized', async function (this: TestContext, assert) {
      await resizeContainer({ height: 300, width: 500 });

      assertDimensions(assert, { height: 300, width: 500 });

      await resizeContainer({ height: 400, width: 800 });

      assertDimensions(assert, { height: 400, width: 800 });

      await resizeContainer({ height: 600, width: 1000 });

      assertDimensions(assert, { height: 600, width: 1000 });
    });
  });

  module('When @features is updated', function (hooks) {
    hooks.beforeEach(async function (this: TestContext) {
      /* @ts-expect-error: We are testing a special case (@features is updated) */
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

      await render<TestContext>(hbs`
        {{! template-lint-disable no-inline-styles }}
        <div data-test-parent-element style="width: 250px; height: 500px;">
          <ContainerQuery
            @features={{this.features}}
            data-test-container-query
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

            <p data-test-width-height>
              {{CQ.dimensions.width}}
              x
              {{CQ.dimensions.height}}
            </p>
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

    test('The component updates the features', function (this: TestContext, assert) {
      assertFeatures(assert, {
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assertFeatures(assert, {
        large: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
      });
    });

    test('The component updates features when it is resized', async function (this: TestContext, assert) {
      await resizeContainer({ height: 300, width: 500 });

      assertFeatures(assert, {
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assertFeatures(assert, {
        large: false,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
      });

      await resizeContainer({ height: 400, width: 800 });

      assertFeatures(assert, {
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assertFeatures(assert, {
        large: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
      });

      await resizeContainer({ height: 600, width: 1000 });

      assertFeatures(assert, {
        small: undefined,
        medium: undefined,
        short: undefined,
        'ratio-type-C': undefined,
      });

      assertFeatures(assert, {
        large: false,
        tall: true,
        'ratio-type-A': false,
        'ratio-type-B': false,
      });
    });
  });
});
