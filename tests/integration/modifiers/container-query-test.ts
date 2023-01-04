import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Modifier | container-query', function (hooks) {
  setupRenderingTest(hooks);

  test('We can call the modifier without passing arguments', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{!-- template-lint-disable no-inline-styles --}}
      <div
        data-test-parent-element
        style="width: 250px; height: 500px;"
      >
        <div
          style="width: 100%; height: 100%;"
          {{container-query}}
        >
        </div>
      </div>
    `);

    assert.ok(true);
  });
});
