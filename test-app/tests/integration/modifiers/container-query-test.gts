import { containerQuery } from 'ember-container-query';

import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Modifier | container-query', function (hooks) {
  setupRenderingTest(hooks);

  test('We can call the modifier without passing arguments', async function (assert) {
    await render(<template>
    {{! template-lint-disable no-inline-styles }}
    <div data-test-parent-element style="width: 250px; height: 500px;">
    <div style="width: 100%; height: 100%;" {{containerQuery}}>
    </div>
    </div>
    </template>);

    assert.ok(true);
  });
});
