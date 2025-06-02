import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest, timeout } from 'test-app/tests/helpers';

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);

  module('...attributes', function () {
    test('The component accepts splattributes', async function (assert) {
      await render(hbs`
        {{! template-lint-disable no-inline-styles }}
        <div style="width: 500px; height: 800px;">
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
            class="unique-class-name"
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

      assert
        .dom('[data-test-container-query]')
        .hasClass('unique-class-name', 'Providing a custom CSS class works.');
    });
  });
});
