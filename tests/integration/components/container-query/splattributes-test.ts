import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import type { CustomAssert } from '../../../helpers';
import {
  setupContainerQueryTest,
  setupRenderingTest,
  timeout,
} from '../../../helpers';

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);
  setupContainerQueryTest(hooks);

  module('...attributes', function () {
    test('The component accepts splattributes', async function (this: TestContext, assert: CustomAssert) {
      await render<TestContext>(hbs`
        {{!-- template-lint-disable no-inline-styles --}}
        <div style="width: 500px; height: 800px;">
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
            class="unique-class-name"
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

      assert
        .dom('[data-test-container-query]')
        .hasClass('unique-class-name', 'Providing a custom CSS class works.');
    });
  });
});
