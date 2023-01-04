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
  tagName?: string;
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);
  setupContainerQueryTest(hooks);

  module('When @tagName is undefined', function (hooks) {
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

    test('The component has the <div> tag', async function (this: TestContext, assert: CustomAssert) {
      assert
        .dom('[data-test-container-query]')
        .hasTagName('div', 'We see the correct tag name.');
    });

    test('The component continues to have the <div> tag when it is resized', async function (this: TestContext, assert: CustomAssert) {
      await resizeContainer({ height: 300, width: 500 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('div', 'We see the correct tag name.');

      await resizeContainer({ height: 400, width: 800 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('div', 'We see the correct tag name.');

      await resizeContainer({ height: 600, width: 1000 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('div', 'We see the correct tag name.');
    });
  });

  module('When @tagName is passed', function (hooks) {
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
            @tagName="section"
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

    test('The component has the correct tag', async function (this: TestContext, assert: CustomAssert) {
      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.');
    });

    test('The component continues to have the correct tag when it is resized', async function (this: TestContext, assert: CustomAssert) {
      await resizeContainer({ height: 300, width: 500 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.');

      await resizeContainer({ height: 400, width: 800 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.');

      await resizeContainer({ height: 600, width: 1000 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.');
    });
  });

  module('When @tagName is updated', function (hooks) {
    hooks.beforeEach(async function (this: TestContext) {
      this.tagName = 'section';

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
            @tagName={{this.tagName}}
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

      set(this, 'tagName', 'article');
    });

    test("The component doesn't update the tag", async function (this: TestContext, assert: CustomAssert) {
      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.')
        .doesNotHaveTagName('article', 'The tag name should not change.');
    });

    test('The component continues to not update the tag when it is resized', async function (this: TestContext, assert: CustomAssert) {
      await resizeContainer({ height: 300, width: 500 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.')
        .doesNotHaveTagName('article', 'The tag name should not change.');

      await resizeContainer({ height: 400, width: 800 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.')
        .doesNotHaveTagName('article', 'The tag name should not change.');

      await resizeContainer({ height: 600, width: 1000 });

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.')
        .doesNotHaveTagName('article', 'The tag name should not change.');
    });
  });
});
