import { set } from '@ember/object';
import {
  fillIn,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  changeset: Record<string, any>;
  updateChangeset: ({ key, value }: { key: string; value: any }) => void;
}

module('Integration | Component | ui/form/textarea', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.changeset = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 container queries!',
      name: 'Zoey',
      subscribe: false,
    };

    this.updateChangeset = () => {
      // Do nothing
    };
  });

  test('The component renders a label and a textarea', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @key="message"
        @label="Message"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Message', 'We see the correct label.');

    assert
      .dom('[data-test-field="Message"]')
      .doesNotHaveAttribute('readonly', 'The textarea should not be readonly.')
      .hasTagName('textarea', 'We see the correct tag name.')
      .hasValue('I 🧡 container queries!', 'We see the correct value.')
      .isEnabled('The textarea should be enabled.')
      .isNotRequired('The textarea should not be required.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the text area', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @isDisabled={{true}}
        @key="message"
        @label="Message"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-field="Message"]')
      .isDisabled('The textarea is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @isReadOnly={{true}}
        @key="message"
        @label="Message"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-field="Message"]')
      .hasAttribute('readonly', '', 'We see the readonly attribute.')
      .hasValue('I 🧡 container queries!', 'We see the correct value.');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Textarea
        @changeset={{this.changeset}}
        @isRequired={{true}}
        @key="message"
        @label="Message"
        @onUpdate={{this.updateChangeset}}
      />
    `);

    assert
      .dom('[data-test-label]')
      .hasText('Message *', 'The label shows that the field is required.');

    assert
      .dom('[data-test-field="Message"]')
      .isRequired('The textarea is required.');
  });

  test('We can pass @onUpdate to get the updated value', async function (this: TestContext, assert) {
    let expectedValue = '';

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
      .dom('[data-test-feedback]')
      .hasText('Please provide a value.', 'We see an error message.');

    // Update the value again
    expectedValue = 'Keep up the good work!';

    await fillIn('[data-test-field="Message"]', 'Keep up the good work!');

    assert
      .dom('[data-test-field="Message"]')
      .hasValue('Keep up the good work!', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');

    assert.verifySteps(['onUpdate', 'onUpdate']);
  });
});
