import { set } from '@ember/object';
import { render, settled } from '@ember/test-helpers';
import setupContainerQueryTest from 'dummy/tests/helpers/container-query';
import resizeContainer from 'dummy/tests/helpers/resize-container';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);
  setupContainerQueryTest(hooks);

  module('When @tagName is undefined', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
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
    });

    test('The component has the <div> tag', async function (assert) {
      assert.dom('[data-test-container-query]').hasTagName('div', 'Tag name is correct.');
    });

    test('The component continues to have the <div> tag when it is resized', async function (assert) {
      await resizeContainer(500, 300);

      assert.dom('[data-test-container-query]').hasTagName('div', 'Tag name is correct.');

      await resizeContainer(800, 400);

      assert.dom('[data-test-container-query]').hasTagName('div', 'Tag name is correct.');

      await resizeContainer(1000, 600);

      assert.dom('[data-test-container-query]').hasTagName('div', 'Tag name is correct.');
    });
  });

  module('When @tagName is passed', function (hooks) {
    hooks.beforeEach(async function () {
      await render(hbs`
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
    });

    test('The component has the correct tag', async function (assert) {
      assert.dom('[data-test-container-query]').hasTagName('section', 'Tag name is correct.');
    });

    test('The component continues to have the correct tag when it is resized', async function (assert) {
      await resizeContainer(500, 300);

      assert.dom('[data-test-container-query]').hasTagName('section', 'Tag name is correct.');

      await resizeContainer(800, 400);

      assert.dom('[data-test-container-query]').hasTagName('section', 'Tag name is correct.');

      await resizeContainer(1000, 600);

      assert.dom('[data-test-container-query]').hasTagName('section', 'Tag name is correct.');
    });
  });

  module('When @tagName is updated', function (hooks) {
    hooks.beforeEach(async function () {
      this.tagName = 'section';

      await render(hbs`
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

      set(this, 'tagName', 'article');

      await settled();
    });

    test("The component doesn't update the tag", async function (assert) {
      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'Tag name is correct.')
        .doesNotHaveTagName('article', 'Tag name did not change.');
    });

    test('The component continues to not update the tag when it is resized', async function (assert) {
      await resizeContainer(500, 300);

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'Tag name is correct.')
        .doesNotHaveTagName('article', 'Tag name did not change.');

      await resizeContainer(800, 400);

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'Tag name is correct.')
        .doesNotHaveTagName('article', 'Tag name did not change.');

      await resizeContainer(1000, 600);

      assert
        .dom('[data-test-container-query]')
        .hasTagName('section', 'Tag name is correct.')
        .doesNotHaveTagName('article', 'Tag name did not change.');
    });
  });
});
