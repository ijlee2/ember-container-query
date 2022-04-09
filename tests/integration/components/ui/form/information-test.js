import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/information', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders nothing when we do not pass @title or @instructions', async function (assert) {
    await render(hbs`
      <Ui::Form::Information
        @formId="ember123"
      />
    `);

    assert
      .dom('[data-test-title]')
      .doesNotExist('We should not see the form title.');

    assert
      .dom('[data-test-instructions]')
      .doesNotExist('We should not see the form instructions.');
  });

  test('We can pass @title to display the form title', async function (assert) {
    await render(hbs`
      <Ui::Form::Information
        @formId="ember123"
        @title="Contact me"
      />
    `);

    assert
      .dom('[data-test-title]')
      .hasAttribute('id', 'ember123-title', 'We see the correct ID.')
      .hasText('Contact me', 'We see the form title.');

    assert
      .dom('[data-test-instructions]')
      .doesNotExist('We should not see the form instructions.');
  });

  test('We can pass @instructions to display the form instructions', async function (assert) {
    await render(hbs`
      <Ui::Form::Information
        @formId="ember123"
        @instructions="Still have questions about ember-container-query? Try sending me a message."
      />
    `);

    assert
      .dom('[data-test-title]')
      .doesNotExist('We should not see the form title.');

    assert
      .dom('[data-test-instructions]')
      .hasAttribute('id', 'ember123-instructions', 'We see the correct ID.')
      .hasText(
        'Still have questions about ember-container-query? Try sending me a message.',
        'We see the form instructions.'
      );
  });
});
