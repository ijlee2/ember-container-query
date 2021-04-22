import { render } from '@ember/test-helpers';
import setupContainerQueryTest from 'dummy/tests/helpers/container-query';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);
  setupContainerQueryTest(hooks);

  module('...attributes', function () {
    test('The component accepts splattributes', async function (assert) {
      assert.expect(2);

      this.fetchData = () => {
        assert.ok(
          true,
          '{{did-insert}} modifier works. (But we should find a better way to separate concerns!)'
        );
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

      assert
        .dom('[data-test-container-query]')
        .hasClass('unique-class-name', 'Providing a custom CSS class works.');
    });
  });
});
