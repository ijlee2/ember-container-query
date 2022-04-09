import { set } from '@ember/object';
import { fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/textarea', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.changeset = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: false,
    };
  });

  test('The component renders a label and a textarea', async function (assert) {
    await render(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @key="message"
        @label="Message"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Message', 'We see the correct label.');

    assert
      .dom('[data-test-field="Message"]')
      .doesNotHaveAttribute('readonly', 'The input should not be readonly.')
      .hasTagName('textarea', 'We see the correct tag name.')
      .hasValue('I 🧡 container queries!', 'We see the correct value.')
      .isEnabled('The textarea should be enabled.')
      .isNotRequired('The textarea should not be required.');

    assert
      .dom('[data-test-feedback="Message"]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the text area', async function (assert) {
    await render(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="message"
        @label="Message"
      />
    `);

    assert
      .dom('[data-test-field="Message"]')
      .isDisabled('The textarea is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @isReadOnly={{true}}
        @key="message"
        @label="Message"
      />
    `);

    assert
      .dom('[data-test-field="Message"]')
      .hasAttribute('readonly', '', 'We see the readonly attribute.')
      .hasValue('I 🧡 container queries!', 'We see the correct value.');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="message"
        @label="Message"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Message *', 'The label shows that the field is required.');

    assert
      .dom('[data-test-field="Message"]')
      .isRequired('The textarea should be required.');
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
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="message"
        @label="Message"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    // Update the value
    await fillIn('[data-test-field="Message"]', '');

    assert
      .dom('[data-test-field="Message"]')
      .hasValue('', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Message"]')
      .hasText('Please provide a value.', 'We see an error message.');

    // Update the value again
    expectedValue = 'Keep up the good work!';

    await fillIn('[data-test-field="Message"]', 'Keep up the good work!');

    assert
      .dom('[data-test-field="Message"]')
      .hasValue('Keep up the good work!', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Message"]')
      .doesNotExist('We should not see an error message.');
  });
});
