import { set } from '@ember/object';
import { click, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | ui/form/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.changeset = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: true,
    };
  });

  test('The component renders a label and a checkbox', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Subscribe to The Ember Times?', 'We see the correct label.');

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'true', 'We see the correct value.')
      .hasAria('disabled', 'false', 'The input should be enabled.')
      .hasAria('required', 'false', 'The input should not be required.')
      .hasAttribute('role', 'checkbox', 'We see the correct role.')
      .hasTagName('span', 'We see the correct tag name.');

    assert
      .dom('[data-test-feedback="Subscribe to The Ember Times?"]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the input', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
      />
    `);

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('disabled', 'true', 'The input is disabled.');
  });

  test('We can pass @isRequired to require a value', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText(
        'Subscribe to The Ember Times? *',
        'The label shows that the field is required.'
      );

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('required', 'true', 'The input should be required.');
  });

  test('We can pass @isViewOnly to display the value', async function (assert) {
    await render(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isViewOnly={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
      />
    `);

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasTagName('p', 'We see the correct tag name.')
      .hasText('Yes', 'We see the correct value.');
  });

  test('We can click on the checkbox to toggle the value', async function (assert) {
    assert.expect(6);

    let expectedValue = false;

    this.updateChangeset = ({ key, value }) => {
      assert.strictEqual(
        value,
        expectedValue,
        'The changeset has the correct value.'
      );

      set(this.changeset, key, value);
    };

    await render(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    // Click the checkbox
    await click('[data-test-field="Subscribe to The Ember Times?"]');

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'false', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Subscribe to The Ember Times?"]')
      .hasText('Please select the checkbox.', 'We see an error message.');

    // Click the checkbox again
    expectedValue = true;

    await click('[data-test-field="Subscribe to The Ember Times?"]');

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'true', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Subscribe to The Ember Times?"]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can press the Space key to toggle the value', async function (assert) {
    assert.expect(6);

    let expectedValue = false;

    this.updateChangeset = ({ key, value }) => {
      assert.strictEqual(
        value,
        expectedValue,
        'The changeset has the correct value.'
      );

      set(this.changeset, key, value);
    };

    await render(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    // Press the Space key
    await triggerKeyEvent(
      '[data-test-field="Subscribe to The Ember Times?"]',
      'keypress',
      'Space'
    );

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'false', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Subscribe to The Ember Times?"]')
      .hasText('Please select the checkbox.', 'We see an error message.');

    // Press the Space key again
    expectedValue = true;

    await triggerKeyEvent(
      '[data-test-field="Subscribe to The Ember Times?"]',
      'keypress',
      'Space'
    );

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'true', 'We see the correct value.');

    assert
      .dom('[data-test-feedback="Subscribe to The Ember Times?"]')
      .doesNotExist('We should not see an error message.');
  });
});
