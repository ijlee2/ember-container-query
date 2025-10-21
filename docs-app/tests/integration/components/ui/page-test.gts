import { render } from '@ember/test-helpers';
import UiPage from 'docs-app/components/ui/page';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <UiPage @title="Form">
          Render a section here.
        </UiPage>
      </template>,
    );

    assert.dom('[data-test-page-title]').hasTagName('h1').hasText('Form');

    assert.dom('[data-test-page-content]').hasText('Render a section here.');

    await a11yAudit();
  });
});
