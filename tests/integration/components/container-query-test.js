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


  module('When @classPrefix is undefined', function() {
    test('The component updates this.classSelectors when it is resized', async function(assert) {
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
        .hasClass('container-query--small')
        .doesNotHaveClass('container-query--medium')
        .doesNotHaveClass('container-query--large')
        .doesNotHaveClass('container-query--short')
        .hasClass('container-query--tall');

      await resizeWindow(500, 300);

      assert.dom('[data-test-container-query]')
        .doesNotHaveClass('container-query--small')
        .hasClass('container-query--medium')
        .doesNotHaveClass('container-query--large')
        .hasClass('container-query--short')
        .doesNotHaveClass('container-query--tall');

      await resizeWindow(800, 400);

      assert.dom('[data-test-container-query]')
        .doesNotHaveClass('container-query--small')
        .doesNotHaveClass('container-query--medium')
        .hasClass('container-query--large')
        .hasClass('container-query--short')
        .doesNotHaveClass('container-query--tall');

      await resizeWindow(1000, 600);

      assert.dom('[data-test-container-query]')
        .doesNotHaveClass('container-query--small')
        .doesNotHaveClass('container-query--medium')
        .doesNotHaveClass('container-query--large')
        .doesNotHaveClass('container-query--short')
        .hasClass('container-query--tall');
    });
  });


  module('When @classPrefix is passed', function() {
    test('The component updates this.classSelectors when it is resized', async function(assert) {
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
            @classPrefix="my-app-initials"
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
        .hasClass('my-app-initials--small')
        .doesNotHaveClass('my-app-initials--medium')
        .doesNotHaveClass('my-app-initials--large')
        .doesNotHaveClass('my-app-initials--short')
        .hasClass('my-app-initials--tall');

      await resizeWindow(500, 300);

      assert.dom('[data-test-container-query]')
        .doesNotHaveClass('my-app-initials--small')
        .hasClass('my-app-initials--medium')
        .doesNotHaveClass('my-app-initials--large')
        .hasClass('my-app-initials--short')
        .doesNotHaveClass('my-app-initials--tall');

      await resizeWindow(800, 400);

      assert.dom('[data-test-container-query]')
        .doesNotHaveClass('my-app-initials--small')
        .doesNotHaveClass('my-app-initials--medium')
        .hasClass('my-app-initials--large')
        .hasClass('my-app-initials--short')
        .doesNotHaveClass('my-app-initials--tall');

      await resizeWindow(1000, 600);

      assert.dom('[data-test-container-query]')
        .doesNotHaveClass('my-app-initials--small')
        .doesNotHaveClass('my-app-initials--medium')
        .doesNotHaveClass('my-app-initials--large')
        .doesNotHaveClass('my-app-initials--short')
        .hasClass('my-app-initials--tall');
    });
  });
});