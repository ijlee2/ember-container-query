import { set } from '@ember/object';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import type { CustomAssert } from '../../../helpers';
import {
  resizeContainer,
  setupContainerQueryTest,
  setupRenderingTest,
  timeout,
} from '../../../helpers';

interface TestContext extends BaseTestContext {
  dataAttributePrefix?: string;
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);
  setupContainerQueryTest(hooks);

  module('When @dataAttributePrefix is undefined', function (hooks) {
    hooks.beforeEach(async function () {
      await render<TestContext>(hbs`
        {{!-- template-lint-disable no-inline-styles --}}
        <div
          data-test-parent-element
          style="width: 250px; height: 500px;"
        >
          <ContainerQuery
            @features={{hash
              small=(width max=300)
              medium=(width min=300 max=600)
              large=(width min=600 max=900)
              short=(height max=500)
              tall=(height min=500)
              ratio-type-A=(aspect-ratio min=0.25 max=0.75)
              ratio-type-B=(aspect-ratio min=0.5 max=1.5)
              ratio-type-C=(aspect-ratio min=1.25 max=2)
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

    test('The component creates data attributes when it is rendered', async function (this: TestContext, assert: CustomAssert) {
      assert.areDataAttributesCorrect!({
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

    test('The component updates data attributes when it is resized', async function (this: TestContext, assert: CustomAssert) {
      await resizeContainer({ height: 300, width: 500 });

      assert.areDataAttributesCorrect!({
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

      assert.areDataAttributesCorrect!({
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

      assert.areDataAttributesCorrect!({
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
          {{!-- template-lint-disable no-inline-styles --}}
          <div
            data-test-parent-element
            style="width: 250px; height: 500px;"
          >
            <ContainerQuery
              @features={{hash
                small=(width max=300)
                medium=(width min=300 max=600)
                large=(width min=600 max=900)
                short=(height max=500)
                tall=(height min=500)
                ratio-type-A=(aspect-ratio min=0.25 max=0.75)
                ratio-type-B=(aspect-ratio min=0.5 max=1.5)
                ratio-type-C=(aspect-ratio min=1.25 max=2)
              }}
              @dataAttributePrefix=""
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

      test('The component creates data attributes when it is rendered', async function (this: TestContext, assert: CustomAssert) {
        assert.areDataAttributesCorrect!({
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

      test('The component updates data attributes when it is resized', async function (this: TestContext, assert: CustomAssert) {
        await resizeContainer({ height: 300, width: 500 });

        assert.areDataAttributesCorrect!({
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

        assert.areDataAttributesCorrect!({
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

        assert.areDataAttributesCorrect!({
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
    }
  );

  module(
    'When @dataAttributePrefix is passed (non-empty string)',
    function (hooks) {
      hooks.beforeEach(async function () {
        await render<TestContext>(hbs`
          {{!-- template-lint-disable no-inline-styles --}}
          <div
            data-test-parent-element
            style="width: 250px; height: 500px;"
          >
            <ContainerQuery
              @features={{hash
                small=(width max=300)
                medium=(width min=300 max=600)
                large=(width min=600 max=900)
                short=(height max=500)
                tall=(height min=500)
                ratio-type-A=(aspect-ratio min=0.25 max=0.75)
                ratio-type-B=(aspect-ratio min=0.5 max=1.5)
                ratio-type-C=(aspect-ratio min=1.25 max=2)
              }}
              @dataAttributePrefix="cq"
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

      test('The component creates data attributes when it is rendered', async function (this: TestContext, assert: CustomAssert) {
        assert.areDataAttributesCorrect!({
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

      test('The component updates data attributes when it is resized', async function (this: TestContext, assert: CustomAssert) {
        await resizeContainer({ height: 300, width: 500 });

        assert.areDataAttributesCorrect!({
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

        assert.areDataAttributesCorrect!({
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

        assert.areDataAttributesCorrect!({
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
    }
  );

  module('When @dataAttributePrefix is updated', function (hooks) {
    hooks.beforeEach(async function (this: TestContext) {
      this.dataAttributePrefix = 'cq1';

      await render<TestContext>(hbs`
        {{!-- template-lint-disable no-inline-styles --}}
        <div
          data-test-parent-element
          style="width: 250px; height: 500px;"
        >
          <ContainerQuery
            @features={{hash
              small=(width max=300)
              medium=(width min=300 max=600)
              large=(width min=600 max=900)
              short=(height max=500)
              tall=(height min=500)
              ratio-type-A=(aspect-ratio min=0.25 max=0.75)
              ratio-type-B=(aspect-ratio min=0.5 max=1.5)
              ratio-type-C=(aspect-ratio min=1.25 max=2)
            }}
            @dataAttributePrefix={{this.dataAttributePrefix}}
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

      set(this, 'dataAttributePrefix', 'cq2');
    });

    test('The component updates the data attributes', async function (this: TestContext, assert: CustomAssert) {
      assert.areDataAttributesCorrect!({
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assert.areDataAttributesCorrect!({
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

    test('The component updates the data attributes when it is resized', async function (this: TestContext, assert: CustomAssert) {
      await resizeContainer({ height: 300, width: 500 });

      assert.areDataAttributesCorrect!({
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assert.areDataAttributesCorrect!({
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

      assert.areDataAttributesCorrect!({
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assert.areDataAttributesCorrect!({
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

      assert.areDataAttributesCorrect!({
        'data-cq1-small': undefined,
        'data-cq1-medium': undefined,
        'data-cq1-large': undefined,
        'data-cq1-short': undefined,
        'data-cq1-tall': undefined,
        'data-cq1-ratio-type-A': undefined,
        'data-cq1-ratio-type-B': undefined,
        'data-cq1-ratio-type-C': undefined,
      });

      assert.areDataAttributesCorrect!({
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
