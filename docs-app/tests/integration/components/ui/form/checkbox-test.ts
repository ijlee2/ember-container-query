import { set } from '@ember/object';
import {
  click,
  render,
  type TestContext as BaseTestContext,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  changeset: Record<string, any>;
  updateChangeset: ({ key, value }: { key: string; value: any }) => void;
}

module('Integration | Component | ui/form/checkbox', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.changeset = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: true,
    };

    this.updateChangeset = () => {
      // Do nothing
    };
  });

  test('The component renders a label and a checkbox', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Subscribe to The Ember Times?', 'We see the correct label.');

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'true', 'We see the correct value.')
      .hasAria('disabled', 'false', 'The checkbox should be enabled.')
      .hasAria('readonly', 'false', 'The checkbox should not be readonly.')
      .hasAria('required', 'false', 'The checkbox should not be required.')
      .hasAttribute('role', 'checkbox', 'We see the correct role.')
      .hasAttribute('tabindex', '0', 'The checkbox is focusable.')
      .hasTagName('span', 'We see the correct tag name.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the checkbox', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .doesNotHaveAttribute('tabindex', 'The checkbox should not be focusable.')
      .hasAria('disabled', 'true', 'The checkbox is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isReadOnly={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'true', 'We see the correct value.')
      .hasAria('readonly', 'true', 'We see the aria-readonly attribute.')
      .hasAttribute('tabindex', '0', 'The checkbox is focusable.');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Checkbox
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="subscribe"
        @label="Subscribe to The Ember Times?"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText(
        'Subscribe to The Ember Times? *',
        'The label shows that the field is required.',
      );

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('required', 'true', 'The checkbox is required.');
  });

  test('We can click on the checkbox to toggle the value', async function (this: TestContext, assert) {
    let expectedValue = false;

    this.updateChangeset = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(
        value,
        expectedValue,
        'The changeset has the correct value.',
      );

      set(this.changeset, key, value);
    };

    await render<TestContext>(hbs`
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
      .dom('[data-test-feedback]')
      .hasText('Please select the checkbox.', 'We see an error message.');

    // Click the checkbox again
    expectedValue = true;

    await click('[data-test-field="Subscribe to The Ember Times?"]');

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'true', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');

    assert.verifySteps(['onUpdate', 'onUpdate']);
  });

  test('We can press the Space key to toggle the value', async function (this: TestContext, assert) {
    let expectedValue = false;

    this.updateChangeset = ({ key, value }) => {
      assert.step('onUpdate');

      assert.strictEqual(
        value,
        expectedValue,
        'The changeset has the correct value.',
      );

      set(this.changeset, key, value);
    };

    await render<TestContext>(hbs`
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
      'Space',
    );

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'false', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .hasText('Please select the checkbox.', 'We see an error message.');

    // Press the Space key again
    expectedValue = true;

    await triggerKeyEvent(
      '[data-test-field="Subscribe to The Ember Times?"]',
      'keypress',
      'Space',
    );

    assert
      .dom('[data-test-field="Subscribe to The Ember Times?"]')
      .hasAria('checked', 'true', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');

    assert.verifySteps(['onUpdate', 'onUpdate']);
  });
});
