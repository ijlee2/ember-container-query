import { render } from '@ember/test-helpers';
import resizeWindow from 'dummy/tests/helpers/resize-window';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('@desktop Integration | Component | container-query', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(assert) {
    assert.areFeaturesCorrect = (features = {}) => {
      for (const [name, meetsFeature] of Object.entries(features)) {
        if (meetsFeature) {
          assert.dom(`[data-test-feature="${name}"]`).hasText('true');

        } else if (meetsFeature === false) {
          assert.dom(`[data-test-feature="${name}"]`).hasText('false');

        } else if (!meetsFeature) {
          assert.dom(`[data-test-feature="${name}"]`).hasNoText();

        }
      }
    };
  });

  hooks.afterEach(function(assert) {
    delete assert.areFeaturesCorrect;
  });


  module('When @features is undefined', function() {
    test('The component renders', async function(assert) {
      await render(hbs`
        <div style="width: 500px; height: 800px;">
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
          </ContainerQuery>
        </div>
      `);

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


    test('The component updates this.features when it is resized', async function(assert) {
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
          </ContainerQuery>
        </div>
      `);

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


      await resizeWindow(500, 300);

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


      await resizeWindow(800, 400);

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


      await resizeWindow(1000, 600);

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
  });


  module('When @features is passed', function() {
    test('The component renders', async function(assert) {
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
          </ContainerQuery>
        </div>
      `);

      assert.areFeaturesCorrect({
        small: false,
        medium: true,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false
      });
    });


    test('The component updates this.features when it is resized', async function(assert) {
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


      await resizeWindow(500, 300);

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


      await resizeWindow(800, 400);

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


      await resizeWindow(1000, 600);

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


  module('When @dataAttributePrefix is undefined', function() {
    test('The component updates data attributes when it is resized', async function(assert) {
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
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-container-query]')
        .hasAttribute('data-container-query-small')
        .doesNotHaveAttribute('data-container-query-medium')
        .doesNotHaveAttribute('data-container-query-large')
        .doesNotHaveAttribute('data-container-query-short')
        .hasAttribute('data-container-query-tall')
        .hasAttribute('data-container-query-ratio-type-A')
        .hasAttribute('data-container-query-ratio-type-B')
        .doesNotHaveAttribute('data-container-query-ratio-type-C');


      await resizeWindow(500, 300);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-container-query-small')
        .hasAttribute('data-container-query-medium')
        .doesNotHaveAttribute('data-container-query-large')
        .hasAttribute('data-container-query-short')
        .doesNotHaveAttribute('data-container-query-tall')
        .doesNotHaveAttribute('data-container-query-ratio-type-A')
        .doesNotHaveAttribute('data-container-query-ratio-type-B')
        .hasAttribute('data-container-query-ratio-type-C');


      await resizeWindow(800, 400);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-container-query-small')
        .doesNotHaveAttribute('data-container-query-medium')
        .hasAttribute('data-container-query-large')
        .hasAttribute('data-container-query-short')
        .doesNotHaveAttribute('data-container-query-tall')
        .doesNotHaveAttribute('data-container-query-ratio-type-A')
        .doesNotHaveAttribute('data-container-query-ratio-type-B')
        .doesNotHaveAttribute('data-container-query-ratio-type-C');


      await resizeWindow(1000, 600);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-container-query-small')
        .doesNotHaveAttribute('data-container-query-medium')
        .doesNotHaveAttribute('data-container-query-large')
        .doesNotHaveAttribute('data-container-query-short')
        .hasAttribute('data-container-query-tall')
        .doesNotHaveAttribute('data-container-query-ratio-type-A')
        .doesNotHaveAttribute('data-container-query-ratio-type-B')
        .hasAttribute('data-container-query-ratio-type-C');
    });
  });


  module('When @dataAttributePrefix is passed', function() {
    test('The component updates data attributes when it is resized', async function(assert) {
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
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-container-query]')
        .hasAttribute('data-cq-small')
        .doesNotHaveAttribute('data-cq-medium')
        .doesNotHaveAttribute('data-cq-large')
        .doesNotHaveAttribute('data-cq-short')
        .hasAttribute('data-cq-tall')
        .hasAttribute('data-cq-ratio-type-A')
        .hasAttribute('data-cq-ratio-type-B')
        .doesNotHaveAttribute('data-cq-ratio-type-C');


      await resizeWindow(500, 300);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-cq-small')
        .hasAttribute('data-cq-medium')
        .doesNotHaveAttribute('data-cq-large')
        .hasAttribute('data-cq-short')
        .doesNotHaveAttribute('data-cq-tall')
        .doesNotHaveAttribute('data-cq-ratio-type-A')
        .doesNotHaveAttribute('data-cq-ratio-type-B')
        .hasAttribute('data-cq-ratio-type-C');


      await resizeWindow(800, 400);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-cq-small')
        .doesNotHaveAttribute('data-cq-medium')
        .hasAttribute('data-cq-large')
        .hasAttribute('data-cq-short')
        .doesNotHaveAttribute('data-cq-tall')
        .doesNotHaveAttribute('data-cq-ratio-type-A')
        .doesNotHaveAttribute('data-cq-ratio-type-B')
        .doesNotHaveAttribute('data-cq-ratio-type-C');


      await resizeWindow(1000, 600);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-cq-small')
        .doesNotHaveAttribute('data-cq-medium')
        .doesNotHaveAttribute('data-cq-large')
        .doesNotHaveAttribute('data-cq-short')
        .hasAttribute('data-cq-tall')
        .doesNotHaveAttribute('data-cq-ratio-type-A')
        .doesNotHaveAttribute('data-cq-ratio-type-B')
        .hasAttribute('data-cq-ratio-type-C');
    });
  });


  module('...attributes', function() {
    test('The component accepts splattributes', async function(assert) {
      assert.expect(3);

      this.fetchData = () => {
        assert.ok('{{did-insert}} modifier works. (But we should find a better way to separate concerns!)');
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
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-container-query]')
        .hasClass('unique-class-name', 'Providing a custom CSS class works.')
        .hasAttribute('local-class', 'container', 'ember-css-modules works.');
    });
  });
});