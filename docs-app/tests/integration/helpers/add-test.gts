import { render } from '@ember/test-helpers';
import add from 'docs-app/helpers/add';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Helper | add', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>{{add 1 2 3}}</template>);

    assert.dom().hasText('6');
  });
});
