import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/field', function (hooks) {
  setupRenderingTest(hooks);

  test('The component handles the field layout', async function (assert) {
    await render(hbs`
      <Ui::Form::Field>
        <:label as |l|>
          <label
            data-test-label
            for={{l.inputId}}
          >
            Name
          </label>
        </:label>

        <:field as |f|>
          <input
            data-test-field="Name"
            id={{f.inputId}}
            type="text"
          />
        </:field>
      </Ui::Form::Field>
    `);

    assert.dom('[data-test-label]').hasText('Name', 'We see the label.');

    assert.dom('[data-test-field="Name"]').hasValue('', 'We see the field.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('We can pass @errorMessage to show an error message', async function (assert) {
    await render(hbs`
      <Ui::Form::Field
        @errorMessage="Please provide a value."
      >
        <:label as |l|>
          <label
            data-test-label
            for={{l.inputId}}
          >
            Name
          </label>
        </:label>

        <:field as |f|>
          <input
            data-test-field="Name"
            id={{f.inputId}}
            required
            type="text"
          />
        </:field>
      </Ui::Form::Field>
    `);

    assert
      .dom('[data-test-feedback]')
      .hasText('Please provide a value.', 'We see the error message.');
  });
});
