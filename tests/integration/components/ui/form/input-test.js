import { set } from '@ember/object';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/input', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.changeset = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: false,
    };
  });

  test('The component renders a label and an input', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @changeset={{this.changeset}}
        @key="name"
        @label="Name"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Name', 'We see the correct label.');

    assert
      .dom('[data-test-field="Name"]')
      .doesNotHaveAttribute('readonly', 'The input should not be readonly.')
      .hasAttribute('type', 'text', 'We see the correct type.')
      .hasTagName('input', 'We see the correct tag name.')
      .hasValue('Zoey', 'We see the correct value.')
      .isEnabled('The input should be enabled.')
      .isNotRequired('The input should not be required.');

    assert
      .dom('[data-test-feedback="Name"]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the input', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="name"
        @label="Name"
      />
    `);

    assert.dom('[data-test-field="Name"]').isDisabled('The input is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @changeset={{this.changeset}}
        @isReadOnly={{true}}
        @key="name"
        @label="Name"
      />
    `);

    assert
      .dom('[data-test-field="Name"]')
      .hasAttribute('readonly', '', 'We see the readonly attribute.')
      .hasValue('Zoey', 'We see the correct value.');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="name"
        @label="Name"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Name *', 'The label shows that the field is required.');

    assert
      .dom('[data-test-field="Name"]')
      .isRequired('The input should be required.');
  });

  test('We can pass @onUpdate to get the updated value', async function (assert) {
    assert.expect(6);

    let expectedValue = '';

    this.updateChangeset = ({ key, value }) => {
      assert.strictEqual(
        value,
        expectedValue,
        'The changeset has the correct value.'
      );

      set(this.changeset, key, value);
    };

    await render(hbs`
      <Ui::Form::Input
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="name"
        @label="Name"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    // Update the value
    await fillIn('[data-test-field="Name"]', '');

    assert
      .dom('[data-test-field="Name"]')
      .hasValue('', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Name"]')
      .hasText('Please provide a value.', 'We see an error message.');

    // Update the value again
    expectedValue = 'Tomster';

    await fillIn('[data-test-field="Name"]', 'Tomster');

    assert
      .dom('[data-test-field="Name"]')
      .hasValue('Tomster', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Name"]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @type to create an email input', async function (assert) {
    await render(hbs`
      <Ui::Form::Input
        @changeset={{this.changeset}}
        @key="email"
        @label="Email"
        @type="email"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Email', 'We see the correct label.');

    assert
      .dom('[data-test-field="Email"]')
      .doesNotHaveAttribute('readonly', 'The input should not be readonly.')
      .hasAttribute('type', 'email', 'We see the correct type.')
      .hasTagName('input', 'We see the correct tag name.')
      .hasValue('zoey@emberjs.com', 'We see the correct value.')
      .isEnabled('The input should be enabled.')
      .isNotRequired('The input should not be required.');

    assert
      .dom('[data-test-feedback="Name"]')
      .doesNotExist('We should not see an error message.');
  });
});
