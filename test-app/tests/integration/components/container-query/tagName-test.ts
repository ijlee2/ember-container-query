import { set } from '@ember/object';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import {
  resizeContainer,
  setupRenderingTest,
  timeout,
} from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  tagName?: string;
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);

  module('When @tagName is undefined', function (hooks) {
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

    test('The component has the <div> tag', function (this: TestContext, assert) {
      assert
        .dom('[data-test-container-query]')
        .hasTagName('div', 'We see the correct tag name.');
    });

    test('The component continues to have the <div> tag when it is resized', async function (this: TestContext, assert) {
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
            @tagName="section"
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

    test('The component has the correct tag', function (this: TestContext, assert) {
      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.');
    });

    test('The component continues to have the correct tag when it is resized', async function (this: TestContext, assert) {
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
            @tagName={{this.tagName}}
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

      set(this, 'tagName', 'article');
    });

    test("The component doesn't update the tag", function (this: TestContext, assert) {
      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'We see the correct tag name.')
        .doesNotHaveTagName('article', 'The tag name should not change.');
    });

    test('The component continues to not update the tag when it is resized', async function (this: TestContext, assert) {
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
