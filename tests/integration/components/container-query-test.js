import { render } from '@ember/test-helpers';
import resizeWindow from 'dummy/tests/helpers/resize-window';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('@desktop Integration | Component | container-query', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(assert) {
    assert.areBreakpointsCorrect = (breakpoints = {}) => {
      for (const [name, meetsBreakpoint] of Object.entries(breakpoints)) {
        if (meetsBreakpoint) {
          assert.dom(`[data-test-breakpoint="${name}"]`).hasText('true');

        } else if (meetsBreakpoint === false) {
          assert.dom(`[data-test-breakpoint="${name}"]`).hasText('false');

        } else if (!meetsBreakpoint) {
          assert.dom(`[data-test-breakpoint="${name}"]`).hasNoText();

        }
      }
    };
  });

  hooks.afterEach(function(assert) {
    delete assert.areBreakpointsCorrect;
  });


  module('When @breakpoints is undefined', function() {
    test('The component renders', async function(assert) {
      await render(hbs`
        <div style="width: 500px; height: 800px;">
          <ContainerQuery
            as |CQ|
          >
            <p data-test-physical-size>{{CQ.width}} x {{CQ.height}}</p>
            <p data-test-breakpoint="small">{{CQ.breakpoints.small}}</p>
            <p data-test-breakpoint="medium">{{CQ.breakpoints.medium}}</p>
            <p data-test-breakpoint="large">{{CQ.breakpoints.large}}</p>
            <p data-test-breakpoint="short">{{CQ.breakpoints.short}}</p>
            <p data-test-breakpoint="tall">{{CQ.breakpoints.tall}}</p>
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-physical-size]').hasText('500 x 800');
      assert.areBreakpointsCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined
      });
    });


    test('The component updates this.breakpoints when it is resized', async function(assert) {
      await render(hbs`
        <div
          data-test-parent-element
          style="width: 250px; height: 500px;"
        >
          <ContainerQuery
            as |CQ|
          >
            <p data-test-physical-size>{{CQ.width}} x {{CQ.height}}</p>
            <p data-test-breakpoint="small">{{CQ.breakpoints.small}}</p>
            <p data-test-breakpoint="medium">{{CQ.breakpoints.medium}}</p>
            <p data-test-breakpoint="large">{{CQ.breakpoints.large}}</p>
            <p data-test-breakpoint="short">{{CQ.breakpoints.short}}</p>
            <p data-test-breakpoint="tall">{{CQ.breakpoints.tall}}</p>
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-physical-size]').hasText('250 x 500');
      assert.areBreakpointsCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined
      });

      await resizeWindow(500, 300);

      assert.dom('[data-test-physical-size]').hasText('500 x 300');
      assert.areBreakpointsCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined
      });

      await resizeWindow(800, 400);

      assert.dom('[data-test-physical-size]').hasText('800 x 400');
      assert.areBreakpointsCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined
      });

      await resizeWindow(1000, 600);

      assert.dom('[data-test-physical-size]').hasText('1000 x 600');
      assert.areBreakpointsCorrect({
        small: undefined,
        medium: undefined,
        large: undefined,
        short: undefined,
        tall: undefined
      });
    });
  });


  module('When @breakpoints is passed', function() {
    test('The component renders', async function(assert) {
      await render(hbs`
        <div style="width: 500px; height: 800px;">
          <ContainerQuery
            @breakpoints={{hash
              small=(cq-width max=300)
              medium=(cq-width min=300 max=600)
              large=(cq-width min=600 max=900)
              short=(cq-height max=500)
              tall=(cq-height min=500)
            }}
            as |CQ|
          >
            <p data-test-physical-size>{{CQ.width}} x {{CQ.height}}</p>
            <p data-test-breakpoint="small">{{CQ.breakpoints.small}}</p>
            <p data-test-breakpoint="medium">{{CQ.breakpoints.medium}}</p>
            <p data-test-breakpoint="large">{{CQ.breakpoints.large}}</p>
            <p data-test-breakpoint="short">{{CQ.breakpoints.short}}</p>
            <p data-test-breakpoint="tall">{{CQ.breakpoints.tall}}</p>
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-physical-size]').hasText('500 x 800');
      assert.areBreakpointsCorrect({
        small: false,
        medium: true,
        large: false,
        short: false,
        tall: true
      });
    });


    test('The component updates this.breakpoints when it is resized', async function(assert) {
      await render(hbs`
        <div
          data-test-parent-element
          style="width: 250px; height: 500px;"
        >
          <ContainerQuery
            @breakpoints={{hash
              small=(cq-width max=300)
              medium=(cq-width min=300 max=600)
              large=(cq-width min=600 max=900)
              short=(cq-height max=500)
              tall=(cq-height min=500)
            }}
            as |CQ|
          >
            <p data-test-physical-size>{{CQ.width}} x {{CQ.height}}</p>
            <p data-test-breakpoint="small">{{CQ.breakpoints.small}}</p>
            <p data-test-breakpoint="medium">{{CQ.breakpoints.medium}}</p>
            <p data-test-breakpoint="large">{{CQ.breakpoints.large}}</p>
            <p data-test-breakpoint="short">{{CQ.breakpoints.short}}</p>
            <p data-test-breakpoint="tall">{{CQ.breakpoints.tall}}</p>
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-physical-size]').hasText('250 x 500');
      assert.areBreakpointsCorrect({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true
      });

      await resizeWindow(500, 300);

      assert.dom('[data-test-physical-size]').hasText('500 x 300');
      assert.areBreakpointsCorrect({
        small: false,
        medium: true,
        large: false,
        short: true,
        tall: false
      });

      await resizeWindow(800, 400);

      assert.dom('[data-test-physical-size]').hasText('800 x 400');
      assert.areBreakpointsCorrect({
        small: false,
        medium: false,
        large: true,
        short: true,
        tall: false
      });

      await resizeWindow(1000, 600);

      assert.dom('[data-test-physical-size]').hasText('1000 x 600');
      assert.areBreakpointsCorrect({
        small: false,
        medium: false,
        large: false,
        short: false,
        tall: true
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
            @breakpoints={{hash
              small=(cq-width max=300)
              medium=(cq-width min=300 max=600)
              large=(cq-width min=600 max=900)
              short=(cq-height max=500)
              tall=(cq-height min=500)
            }}
            as |CQ|
          >
            <p data-test-physical-size>{{CQ.width}} x {{CQ.height}}</p>
            <p data-test-breakpoint="small">{{CQ.breakpoints.small}}</p>
            <p data-test-breakpoint="medium">{{CQ.breakpoints.medium}}</p>
            <p data-test-breakpoint="large">{{CQ.breakpoints.large}}</p>
            <p data-test-breakpoint="short">{{CQ.breakpoints.short}}</p>
            <p data-test-breakpoint="tall">{{CQ.breakpoints.tall}}</p>
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-container-query]')
        .hasAttribute('data-container-query-small')
        .doesNotHaveAttribute('data-container-query-medium')
        .doesNotHaveAttribute('data-container-query-large')
        .doesNotHaveAttribute('data-container-query-short')
        .hasAttribute('data-container-query-tall');

      await resizeWindow(500, 300);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-container-query-small')
        .hasAttribute('data-container-query-medium')
        .doesNotHaveAttribute('data-container-query-large')
        .hasAttribute('data-container-query-short')
        .doesNotHaveAttribute('data-container-query-tall');

      await resizeWindow(800, 400);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-container-query-small')
        .doesNotHaveAttribute('data-container-query-medium')
        .hasAttribute('data-container-query-large')
        .hasAttribute('data-container-query-short')
        .doesNotHaveAttribute('data-container-query-tall');

      await resizeWindow(1000, 600);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-container-query-small')
        .doesNotHaveAttribute('data-container-query-medium')
        .doesNotHaveAttribute('data-container-query-large')
        .doesNotHaveAttribute('data-container-query-short')
        .hasAttribute('data-container-query-tall');
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
            @breakpoints={{hash
              small=(cq-width max=300)
              medium=(cq-width min=300 max=600)
              large=(cq-width min=600 max=900)
              short=(cq-height max=500)
              tall=(cq-height min=500)
            }}
            @dataAttributePrefix="cq"
            as |CQ|
          >
            <p data-test-physical-size>{{CQ.width}} x {{CQ.height}}</p>
            <p data-test-breakpoint="small">{{CQ.breakpoints.small}}</p>
            <p data-test-breakpoint="medium">{{CQ.breakpoints.medium}}</p>
            <p data-test-breakpoint="large">{{CQ.breakpoints.large}}</p>
            <p data-test-breakpoint="short">{{CQ.breakpoints.short}}</p>
            <p data-test-breakpoint="tall">{{CQ.breakpoints.tall}}</p>
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-container-query]')
        .hasAttribute('data-cq-small')
        .doesNotHaveAttribute('data-cq-medium')
        .doesNotHaveAttribute('data-cq-large')
        .doesNotHaveAttribute('data-cq-short')
        .hasAttribute('data-cq-tall');

      await resizeWindow(500, 300);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-cq-small')
        .hasAttribute('data-cq-medium')
        .doesNotHaveAttribute('data-cq-large')
        .hasAttribute('data-cq-short')
        .doesNotHaveAttribute('data-cq-tall');

      await resizeWindow(800, 400);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-cq-small')
        .doesNotHaveAttribute('data-cq-medium')
        .hasAttribute('data-cq-large')
        .hasAttribute('data-cq-short')
        .doesNotHaveAttribute('data-cq-tall');

      await resizeWindow(1000, 600);

      assert.dom('[data-test-container-query]')
        .doesNotHaveAttribute('data-cq-small')
        .doesNotHaveAttribute('data-cq-medium')
        .doesNotHaveAttribute('data-cq-large')
        .doesNotHaveAttribute('data-cq-short')
        .hasAttribute('data-cq-tall');
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
            @breakpoints={{hash
              small=(cq-width max=300)
              medium=(cq-width min=300 max=600)
              large=(cq-width min=600 max=900)
              short=(cq-height max=500)
              tall=(cq-height min=500)
            }}

            class="unique-class-name"
            local-class="container"
            {{did-insert this.fetchData}}

            as |CQ|
          >
            <p data-test-physical-size>{{CQ.width}} x {{CQ.height}}</p>
            <p data-test-breakpoint="small">{{CQ.breakpoints.small}}</p>
            <p data-test-breakpoint="medium">{{CQ.breakpoints.medium}}</p>
            <p data-test-breakpoint="large">{{CQ.breakpoints.large}}</p>
            <p data-test-breakpoint="short">{{CQ.breakpoints.short}}</p>
            <p data-test-breakpoint="tall">{{CQ.breakpoints.tall}}</p>
          </ContainerQuery>
        </div>
      `);

      assert.dom('[data-test-container-query]')
        .hasClass('unique-class-name', 'Providing a custom CSS class works.')
        .hasAttribute('local-class', 'container', 'ember-css-modules works.');
    });
  });
});