import { find, render } from '@ember/test-helpers';
import resizeContainer, { timeout } from 'dummy/tests/helpers/resize-container';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | container-query', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(assert) {
    assert.areFeaturesCorrect = (features = {}) => {
      for (const [featureName, meetsFeature] of Object.entries(features)) {
        switch (meetsFeature) {
          case true: {
            assert.dom(`[data-test-feature="${featureName}"]`)
              .hasText(
                'true',
                `The container meets the feature "${featureName}".`
              );

            break;
          }

          case false: {
            assert.dom(`[data-test-feature="${featureName}"]`)
              .hasText(
                'false',
                `The container doesn't meet the feature "${featureName}".`
              );

            break;
          }

          case undefined: {
            assert.dom(`[data-test-feature="${featureName}"]`)
              .hasNoText(`The container doesn't meet the feature "${featureName}".`);

            break;
          }
        }
      }
    };

    assert.areDimensionsCorrect = (expectedWidth, expectedHeight) => {
      assert.dom('[data-test-width-height]')
        .hasText(
          `${expectedWidth} x ${expectedHeight}`,
          'Width and height are correct.'
        );

      const aspectRatio = Number(find('[data-test-aspect-ratio]').textContent.trim());
      const expectedAspectRatio = expectedWidth / expectedHeight;
      const tolerance = 0.001;

      if (expectedAspectRatio === Infinity) {
        assert.strictEqual(
          aspectRatio === expectedAspectRatio,
          true,
          'Aspect ratio is correct.'
        );

      } else {
        assert.strictEqual(
          Math.abs(aspectRatio - expectedAspectRatio) / Math.abs(expectedAspectRatio) < tolerance,
          true,
          'Aspect ratio is correct.'
        );

      }
    };

    assert.areDataAttributesCorrect = (dataAttributes = {}) => {
      const containerQuery = find('[data-test-container-query]');

      for (const [dataAttributeName, expectedValue] of Object.entries(dataAttributes)) {
        switch (expectedValue) {
          case undefined: {
            assert.dom(containerQuery)
              .doesNotHaveAttribute(
                dataAttributeName,
                `The container doesn't have the attribute "${dataAttributeName}".`
              );

            break;
          }

          default: {
            assert.dom(containerQuery)
              .hasAttribute(
                dataAttributeName,
                expectedValue,
                `The container has the attribute "${dataAttributeName}".`
              );
          }
        }
      }
    };
  });

  hooks.afterEach(function(assert) {
    delete assert.areFeaturesCorrect;
    delete assert.areDimensionsCorrect;
    delete assert.areDataAttributesCorrect;
  });


  module('When @features is undefined', function(hooks) {
    hooks.beforeEach(async function() {
      await render(hbs`
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
    });


    test('The component renders', async function(assert) {
      assert.areFeaturesCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined
      });

      assert.areDimensionsCorrect(250, 500);
    });


    test('The component updates features when it is resized', async function(assert) {
      await resizeContainer(500, 300);

      assert.areFeaturesCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined
      });


      await resizeContainer(800, 400);

      assert.areFeaturesCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined
      });


      await resizeContainer(1000, 600);

      assert.areFeaturesCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined,
        'ratio-type-A': undefined,
        'ratio-type-B': undefined,
        'ratio-type-C': undefined
      });
    });


    test('The component updates dimensions when it is resized', async function(assert) {
      await resizeContainer(500, 300);

      assert.areDimensionsCorrect(500, 300);


      await resizeContainer(800, 400);

      assert.areDimensionsCorrect(800, 400);


      await resizeContainer(1000, 600);

      assert.areDimensionsCorrect(1000, 600);
    });
  });


  module('When @features is passed', function(hooks) {
    hooks.beforeEach(async function() {
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


    test('The component renders', async function(assert) {
      assert.areFeaturesCorrect({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false
      });

      assert.areDimensionsCorrect(250, 500);
    });


    test('The component updates features when it is resized', async function(assert) {
      await resizeContainer(500, 300);

      assert.areFeaturesCorrect({
        small: false,
        medium: true,
        large: false,
        short: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': true
      });


      await resizeContainer(800, 400);

      assert.areFeaturesCorrect({
        small: false,
        medium: false,
        large: true,
        short: true,
        tall: false,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': false
      });


      await resizeContainer(1000, 600);

      assert.areFeaturesCorrect({
        small: false,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': true
      });
    });


    test('The component updates dimensions when it is resized', async function(assert) {
      await resizeContainer(500, 300);

      assert.areDimensionsCorrect(500, 300);


      await resizeContainer(800, 400);

      assert.areDimensionsCorrect(800, 400);


      await resizeContainer(1000, 600);

      assert.areDimensionsCorrect(1000, 600);
    });
  });


  module('When @dataAttributePrefix is undefined', function(hooks) {
    hooks.beforeEach(async function() {
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


    test('The component creates data attributes when it is rendered', async function(assert) {
      assert.areDataAttributesCorrect({
        'data-container-query-small': '',
        'data-container-query-medium': undefined,
        'data-container-query-large': undefined,
        'data-container-query-short': undefined,
        'data-container-query-tall': '',
        'data-container-query-ratio-type-A': '',
        'data-container-query-ratio-type-B': '',
        'data-container-query-ratio-type-C': undefined
      });
    });


    test('The component updates data attributes when it is resized', async function(assert) {
      await resizeContainer(500, 300);

      assert.areDataAttributesCorrect({
        'data-container-query-small': undefined,
        'data-container-query-medium': '',
        'data-container-query-large': undefined,
        'data-container-query-short': '',
        'data-container-query-tall': undefined,
        'data-container-query-ratio-type-A': undefined,
        'data-container-query-ratio-type-B': undefined,
        'data-container-query-ratio-type-C': ''
      });


      await resizeContainer(800, 400);

      assert.areDataAttributesCorrect({
        'data-container-query-small': undefined,
        'data-container-query-medium': undefined,
        'data-container-query-large': '',
        'data-container-query-short': '',
        'data-container-query-tall': undefined,
        'data-container-query-ratio-type-A': undefined,
        'data-container-query-ratio-type-B': undefined,
        'data-container-query-ratio-type-C': undefined
      });


      await resizeContainer(1000, 600);

      assert.areDataAttributesCorrect({
        'data-container-query-small': undefined,
        'data-container-query-medium': undefined,
        'data-container-query-large': undefined,
        'data-container-query-short': undefined,
        'data-container-query-tall': '',
        'data-container-query-ratio-type-A': undefined,
        'data-container-query-ratio-type-B': undefined,
        'data-container-query-ratio-type-C': ''
      });
    });
  });


  module('When @dataAttributePrefix is passed', function(hooks) {
    hooks.beforeEach(async function() {
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
    });


    test('The component creates data attributes when it is rendered', async function(assert) {
      assert.areDataAttributesCorrect({
        'data-cq-small': '',
        'data-cq-medium': undefined,
        'data-cq-large': undefined,
        'data-cq-short': undefined,
        'data-cq-tall': '',
        'data-cq-ratio-type-A': '',
        'data-cq-ratio-type-B': '',
        'data-cq-ratio-type-C': undefined
      });
    });


    test('The component updates data attributes when it is resized', async function(assert) {
      await resizeContainer(500, 300);

      assert.areDataAttributesCorrect({
        'data-cq-small': undefined,
        'data-cq-medium': '',
        'data-cq-large': undefined,
        'data-cq-short': '',
        'data-cq-tall': undefined,
        'data-cq-ratio-type-A': undefined,
        'data-cq-ratio-type-B': undefined,
        'data-cq-ratio-type-C': ''
      });


      await resizeContainer(800, 400);

      assert.areDataAttributesCorrect({
        'data-cq-small': undefined,
        'data-cq-medium': undefined,
        'data-cq-large': '',
        'data-cq-short': '',
        'data-cq-tall': undefined,
        'data-cq-ratio-type-A': undefined,
        'data-cq-ratio-type-B': undefined,
        'data-cq-ratio-type-C': undefined
      });


      await resizeContainer(1000, 600);

      assert.areDataAttributesCorrect({
        'data-cq-small': undefined,
        'data-cq-medium': undefined,
        'data-cq-large': undefined,
        'data-cq-short': undefined,
        'data-cq-tall': '',
        'data-cq-ratio-type-A': undefined,
        'data-cq-ratio-type-B': undefined,
        'data-cq-ratio-type-C': ''
      });
    });
  });


  module('When @debounce is passed', function() {
    test('Container queries are debounced until the @debounce time passes', async function(assert) {
      /*
        Caution:

        There is a dependency between the implementations of this test and
        the `resizeContainer` test helper. The test helper waits for 100ms to
        pass so that assertions that should pass will always pass.

        As a result, we can test `@debounce` only when the value is larger
        than 100.
      */
      this.debounce = 250;

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
            @debounce={{this.debounce}}
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

      assert.areFeaturesCorrect({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false
      });


      // After a resize, the container query results should remain the
      // same as before.
      await resizeContainer(500, 300);

      assert.areFeaturesCorrect({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false
      });


      await resizeContainer(800, 400);

      assert.areFeaturesCorrect({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false
      });


      await resizeContainer(1000, 600);

      assert.areFeaturesCorrect({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false
      });


      // After the debounce time passes, the container query results
      // will update.
      await timeout(this.debounce);

      assert.areFeaturesCorrect({
        small: false,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': true
      });
    });
  });


  module('...attributes', function() {
    test('The component accepts splattributes', async function(assert) {
      assert.expect(3);

      this.fetchData = () => {
        assert.ok(true, '{{did-insert}} modifier works. (But we should find a better way to separate concerns!)');
      };

      await render(hbs`
        <div style="width: 500px; height: 800px;">
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

            class="unique-class-name"
            local-class="container"
            {{did-insert this.fetchData}}

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

      assert.dom('[data-test-container-query]')
        .hasClass('unique-class-name', 'Providing a custom CSS class works.')
        .hasAttribute('local-class', 'container', 'ember-css-modules works.');
    });
  });
});