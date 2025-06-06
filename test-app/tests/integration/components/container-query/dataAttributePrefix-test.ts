import { set } from '@ember/object';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import {
  assertDataAttributes,
  resizeContainer,
  setupRenderingTest,
  timeout,
} from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  dataAttributePrefix?: string;
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);

  module('When @dataAttributePrefix is undefined', function (hooks) {
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
            <p data-test-aspect-ratio>
              {{CQ.dimensions.aspectRatio}}
            </p>
          </ContainerQuery>
        </div>
      `);

      await timeout();
    });

    test('The component creates data attributes when it is rendered', function (this: TestContext, assert) {
      assertDataAttributes(assert, {
        'data-container-query-small': '',
        'data-container-query-medium': undefined,
        'data-container-query-large': undefined,
        'data-container-query-short': undefined,
        'data-container-query-tall': '',
        'data-container-query-ratio-type-A': '',
        'data-container-query-ratio-type-B': '',
        'data-container-query-ratio-type-C': undefined,
      });
    });

    test('The component updates data attributes when it is resized', async function (this: TestContext, assert) {
      await resizeContainer({ height: 300, width: 500 });

      assertDataAttributes(assert, {
        'data-container-query-small': undefined,
        'data-container-query-medium': '',
        'data-container-query-large': undefined,
        'data-container-query-short': '',
        'data-container-query-tall': undefined,
        'data-container-query-ratio-type-A': undefined,
        'data-container-query-ratio-type-B': undefined,
        'data-container-query-ratio-type-C': '',
      });

      await resizeContainer({ height: 400, width: 800 });

      assertDataAttributes(assert, {
        'data-container-query-small': undefined,
        'data-container-query-medium': undefined,
        'data-container-query-large': '',
        'data-container-query-short': '',
        'data-container-query-tall': undefined,
        'data-container-query-ratio-type-A': undefined,
        'data-container-query-ratio-type-B': undefined,
        'data-container-query-ratio-type-C': undefined,
      });

      await resizeContainer({ height: 600, width: 1000 });

      assertDataAttributes(assert, {
        'data-container-query-small': undefined,
        'data-container-query-medium': undefined,
        'data-container-query-large': undefined,
        'data-container-query-short': undefined,
        'data-container-query-tall': '',
        'data-container-query-ratio-type-A': undefined,
        'data-container-query-ratio-type-B': undefined,
        'data-container-query-ratio-type-C': '',
      });
    });
  });

  module(
    'When @dataAttributePrefix is passed (empty string)',
    function (hooks) {
      hooks.beforeEach(async function () {
        await render<TestContext>(hbs`
          {{! template-lint-disable no-inline-styles }}
          <div data-test-parent-element style="width: 250px; height: 500px;">
            <ContainerQuery
              @dataAttributePrefix=""
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

              <p data-test-feature="ratio-type-A">
                {{CQ.features.ratio-type-A}}
              </p>
              <p data-test-feature="ratio-type-B">
                {{CQ.features.ratio-type-B}}
              </p>
              <p data-test-feature="ratio-type-C">
                {{CQ.features.ratio-type-C}}
              </p>

              <p data-test-width-height>
                {{CQ.dimensions.width}}
                x
                {{CQ.dimensions.height}}
              </p>
              <p data-test-aspect-ratio>
                {{CQ.dimensions.aspectRatio}}
              </p>
            </ContainerQuery>
          </div>
        `);

        await timeout();
      });

      test('The component creates data attributes when it is rendered', function (this: TestContext, assert) {
        assertDataAttributes(assert, {
          'data-small': '',
          'data-medium': undefined,
          'data-large': undefined,
          'data-short': undefined,
          'data-tall': '',
          'data-ratio-type-A': '',
          'data-ratio-type-B': '',
          'data-ratio-type-C': undefined,
        });
      });

      test('The component updates data attributes when it is resized', async function (this: TestContext, assert) {
        await resizeContainer({ height: 300, width: 500 });

        assertDataAttributes(assert, {
          'data-small': undefined,
          'data-medium': '',
          'data-large': undefined,
          'data-short': '',
          'data-tall': undefined,
          'data-ratio-type-A': undefined,
          'data-ratio-type-B': undefined,
          'data-ratio-type-C': '',
        });

        await resizeContainer({ height: 400, width: 800 });

        assertDataAttributes(assert, {
          'data-small': undefined,
          'data-medium': undefined,
          'data-large': '',
          'data-short': '',
          'data-tall': undefined,
          'data-ratio-type-A': undefined,
          'data-ratio-type-B': undefined,
          'data-ratio-type-C': undefined,
        });

        await resizeContainer({ height: 600, width: 1000 });

        assertDataAttributes(assert, {
          'data-small': undefined,
          'data-medium': undefined,
          'data-large': undefined,
          'data-short': undefined,
          'data-tall': '',
          'data-ratio-type-A': undefined,
          'data-ratio-type-B': undefined,
          'data-ratio-type-C': '',
        });
      });
    },
  );

  module(
    'When @dataAttributePrefix is passed (non-empty string)',
    function (hooks) {
      hooks.beforeEach(async function () {
        await render<TestContext>(hbs`
          {{! template-lint-disable no-inline-styles }}
          <div data-test-parent-element style="width: 250px; height: 500px;">
            <ContainerQuery
              @dataAttributePrefix="cq"
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

              <p data-test-feature="ratio-type-A">
                {{CQ.features.ratio-type-A}}
              </p>
              <p data-test-feature="ratio-type-B">
                {{CQ.features.ratio-type-B}}
              </p>
              <p data-test-feature="ratio-type-C">
                {{CQ.features.ratio-type-C}}
              </p>

              <p data-test-width-height>
                {{CQ.dimensions.width}}
                x
                {{CQ.dimensions.height}}
              </p>
              <p data-test-aspect-ratio>
                {{CQ.dimensions.aspectRatio}}
              </p>
            </ContainerQuery>
          </div>
        `);

        await timeout();
      });

      test('The component creates data attributes when it is rendered', function (this: TestContext, assert) {
        assertDataAttributes(assert, {
          'data-cq-small': '',
          'data-cq-medium': undefined,
          'data-cq-large': undefined,
          'data-cq-short': undefined,
          'data-cq-tall': '',
          'data-cq-ratio-type-A': '',
          'data-cq-ratio-type-B': '',
          'data-cq-ratio-type-C': undefined,
        });
      });

      test('The component updates data attributes when it is resized', async function (this: TestContext, assert) {
        await resizeContainer({ height: 300, width: 500 });

        assertDataAttributes(assert, {
          'data-cq-small': undefined,
          'data-cq-medium': '',
          'data-cq-large': undefined,
          'data-cq-short': '',
          'data-cq-tall': undefined,
          'data-cq-ratio-type-A': undefined,
          'data-cq-ratio-type-B': undefined,
          'data-cq-ratio-type-C': '',
        });

        await resizeContainer({ height: 400, width: 800 });

        assertDataAttributes(assert, {
          'data-cq-small': undefined,
          'data-cq-medium': undefined,
          'data-cq-large': '',
          'data-cq-short': '',
          'data-cq-tall': undefined,
          'data-cq-ratio-type-A': undefined,
          'data-cq-ratio-type-B': undefined,
          'data-cq-ratio-type-C': undefined,
        });

        await resizeContainer({ height: 600, width: 1000 });

        assertDataAttributes(assert, {
          'data-cq-small': undefined,
          'data-cq-medium': undefined,
          'data-cq-large': undefined,
          'data-cq-short': undefined,
          'data-cq-tall': '',
          'data-cq-ratio-type-A': undefined,
          'data-cq-ratio-type-B': undefined,
          'data-cq-ratio-type-C': '',
        });
      });
    },
  );

  module('When @dataAttributePrefix is updated', function (hooks) {
    hooks.beforeEach(async function (this: TestContext) {
      this.dataAttributePrefix = 'cq1';

      await render<TestContext>(hbs`
        {{! template-lint-disable no-inline-styles }}
        <div data-test-parent-element style="width: 250px; height: 500px;">
          <ContainerQuery
            @dataAttributePrefix={{this.dataAttributePrefix}}
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
            <p data-test-aspect-ratio>
              {{CQ.dimensions.aspectRatio}}
            </p>
          </ContainerQuery>
        </div>
      `);

      await timeout();

      set(this, 'dataAttributePrefix', 'cq2');
    });

    test('The component updates the data attributes', function (this: TestContext, assert) {
      assertDataAttributes(assert, {
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assertDataAttributes(assert, {
        'data-cq2-small': '',
        'data-cq2-medium': undefined,
        'data-cq2-large': undefined,
        'data-cq2-short': undefined,
        'data-cq2-tall': '',
        'data-cq2-ratio-type-A': '',
        'data-cq2-ratio-type-B': '',
        'data-cq2-ratio-type-C': undefined,
      });
    });

    test('The component updates the data attributes when it is resized', async function (this: TestContext, assert) {
      await resizeContainer({ height: 300, width: 500 });

      assertDataAttributes(assert, {
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assertDataAttributes(assert, {
        'data-cq2-small': undefined,
        'data-cq2-medium': '',
        'data-cq2-large': undefined,
        'data-cq2-short': '',
        'data-cq2-tall': undefined,
        'data-cq2-ratio-type-A': undefined,
        'data-cq2-ratio-type-B': undefined,
        'data-cq2-ratio-type-C': '',
      });

      await resizeContainer({ height: 400, width: 800 });

      assertDataAttributes(assert, {
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assertDataAttributes(assert, {
        'data-cq2-small': undefined,
        'data-cq2-medium': undefined,
        'data-cq2-large': '',
        'data-cq2-short': '',
        'data-cq2-tall': undefined,
        'data-cq2-ratio-type-A': undefined,
        'data-cq2-ratio-type-B': undefined,
        'data-cq2-ratio-type-C': undefined,
      });

      await resizeContainer({ height: 600, width: 1000 });

      assertDataAttributes(assert, {
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assertDataAttributes(assert, {
        'data-cq2-small': undefined,
        'data-cq2-medium': undefined,
        'data-cq2-large': undefined,
        'data-cq2-short': undefined,
        'data-cq2-tall': '',
        'data-cq2-ratio-type-A': undefined,
        'data-cq2-ratio-type-B': undefined,
        'data-cq2-ratio-type-C': '',
      });
    });
  });
});
