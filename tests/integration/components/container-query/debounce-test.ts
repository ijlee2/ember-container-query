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
  debounce?: number;
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);
  setupContainerQueryTest(hooks);

  module('When @debounce is passed', function () {
    test('Container queries are debounced until the @debounce time passes', async function (this: TestContext, assert: CustomAssert) {
      /*
        Caution:

        There is a dependency between the implementations of this test and
        the `resizeContainer` test helper. The test helper waits for 100ms to
        pass so that assertions that should pass will always pass.

        As a result, we can test `@debounce` only when the value is larger
        than `RERENDER_TIME`.
      */
      this.debounce = 250;

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

      assert.areFeaturesCorrect!({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false,
      });

      // After a resize, the container query results should remain the
      // same as before.
      await resizeContainer({ height: 300, width: 500 });

      assert.areFeaturesCorrect!({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false,
      });

      await resizeContainer({ height: 400, width: 800 });

      assert.areFeaturesCorrect!({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false,
      });

      await resizeContainer({ height: 600, width: 1000 });

      assert.areFeaturesCorrect!({
        small: true,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': true,
        'ratio-type-B': true,
        'ratio-type-C': false,
      });

      // After the debounce time passes, the container query results
      // will update.
      await timeout(this.debounce);

      assert.areFeaturesCorrect!({
        small: false,
        medium: false,
        large: false,
        short: false,
        tall: true,
        'ratio-type-A': false,
        'ratio-type-B': false,
        'ratio-type-C': true,
      });
    });
  });
});
