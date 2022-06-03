import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('The component handles the page layout', async function (assert) {
    await render(hbs`
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
