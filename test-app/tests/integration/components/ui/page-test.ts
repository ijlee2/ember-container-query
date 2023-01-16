import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('The component handles the page layout', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Page
        @title="Form"
      >
        <div data-test-body>
        </div>
      </Ui::Page>
    `);

    assert.dom('h1').hasText('Form', 'We see the title.');

    assert.dom('[data-test-body]').exists('We see the yielded content.');
  });
});
