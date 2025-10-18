import { render } from '@ember/test-helpers';
import UiFormInformation from 'docs-app/components/ui/form/information';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/information', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><UiFormInformation @formId="ember123" /></template>);

    assert.dom('[data-test-title]').doesNotExist();

    assert.dom('[data-test-instructions]').doesNotExist();
  });

  test('We can pass @title to display the form title', async function (assert) {
    await render(
      <template>
        <UiFormInformation @formId="ember123" @title="Contact me" />
      </template>,
    );

    assert
      .dom('[data-test-title]')
      .hasAttribute('id', 'ember123-title')
      .hasText('Contact me');

    assert.dom('[data-test-instructions]').doesNotExist();
  });

  test('We can pass @instructions to display the form instructions', async function (assert) {
    await render(
      <template>
        <UiFormInformation
          @formId="ember123"
          @instructions="Still have questions about ember-container-query? Try sending me a message."
        />
      </template>,
    );

    assert.dom('[data-test-title]').doesNotExist();

    assert
      .dom('[data-test-instructions]')
      .hasAttribute('id', 'ember123-instructions')
      .hasText(
        'Still have questions about ember-container-query? Try sending me a message.',
      );
  });
});
