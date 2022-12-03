import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  noOp: (imageSource?: string) => void;
}

module('Integration | Modifier | find-best-fitting-image', function (hooks) {
  setupRenderingTest(hooks);

  test('We can find the best-fitting image', async function (this: TestContext, assert) {
    this.noOp = () => {
      // Do nothing
    };

    await render(hbs`
      <div
        {{find-best-fitting-image
          onQuery=this.noOp
        }}
      >
      </div>
    `);

    assert.ok(true);
  });
});
