import { hash } from '@ember/helper';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import {
  aspectRatio,
  ContainerQuery,
  height,
  width,
} from 'ember-container-query';
import { module, test } from 'qunit';
import {
  assertFeatures,
  resizeContainer,
  setupRenderingTest,
  timeout,
} from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  debounce?: number;
}

module('Integration | Component | container-query', function (hooks) {
  setupRenderingTest(hooks);

  module('When @debounce is passed', function () {
    test('Container queries are debounced until the @debounce time passes', async function (this: TestContext, assert) {
      /*
        Caution:

        There is a dependency between the implementations of this test and
        the `resizeContainer` test helper. The test helper waits for 100ms to
        pass so that assertions that should pass will always pass.

        As a result, we can test `@debounce` only when the value is larger
        than `RERENDER_TIME`.
      */
      this.debounce = 250;

      const self = this;

      await render(
        <template>
          {{! template-lint-disable no-inline-styles }}
          <div data-test-parent-element style="width: 250px; height: 500px;">
            <ContainerQuery
              @debounce={{self.debounce}}
              @features={{hash
                large=(width max=900 min=600)
                medium=(width max=600 min=300)
                ratio-type-A=(aspectRatio max=0.75 min=0.25)
                ratio-type-B=(aspectRatio max=1.5 min=0.5)
                ratio-type-C=(aspectRatio max=2 min=1.25)
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

              <p
                data-test-feature="ratio-type-A"
              >{{CQ.features.ratio-type-A}}</p>
              <p
                data-test-feature="ratio-type-B"
              >{{CQ.features.ratio-type-B}}</p>
              <p
                data-test-feature="ratio-type-C"
              >{{CQ.features.ratio-type-C}}</p>

              <p data-test-width-height>
                {{CQ.dimensions.width}}
                x
                {{CQ.dimensions.height}}
              </p>
              <p data-test-aspect-ratio>{{CQ.dimensions.aspectRatio}}</p>
            </ContainerQuery>
          </div>
        </template>,
      );

      assertFeatures(assert, {
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

      assertFeatures(assert, {
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

      assertFeatures(assert, {
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

      assertFeatures(assert, {
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

      assertFeatures(assert, {
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
