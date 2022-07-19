import { render } from '@ember/test-helpers';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  noOp: (imageSource?: string) => void;
}

module('Integration | Modifier | find-best-fitting-image', function (hooks) {
  setupRenderingTest(hooks);

  test('We can find the best-fitting image', async function (this: TestContext, assert) {
    /* eslint-disable-next-line @typescript-eslint/no-empty-function */
    this.noOp = () => {};

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
