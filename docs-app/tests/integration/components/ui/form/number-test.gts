import {
  fillIn,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import UiFormNumber from 'docs-app/components/ui/form/number';
import { setupRenderingTest, UiForm } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  parent: UiForm;
}

module('Integration | Component | ui/form/number', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.parent = new UiForm();
  });

  test('it renders', async function (this: TestContext, assert) {
    const { parent } = this;

    await render(
      <template>
        <UiFormNumber
          @data={{parent.data}}
          @key="donation"
          @label="Donation amount ($)"
          @minValue={{0}}
          @onUpdate={{parent.updateData}}
          @placeholder="100"
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Donation amount ($)');

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('readonly')
      .hasAttribute('type', 'number')
      .hasTagName('input')
      .hasValue('1000')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the input', async function (this: TestContext, assert) {
    const { parent } = this;

    await render(
      <template>
        <UiFormNumber
          @data={{parent.data}}
          @isDisabled={{true}}
          @key="donation"
          @label="Donation amount ($)"
          @minValue={{0}}
          @onUpdate={{parent.updateData}}
          @placeholder="100"
        />
      </template>,
    );

    assert.dom('[data-test-field]').isDisabled();
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    const { parent } = this;

    await render(
      <template>
        <UiFormNumber
          @data={{parent.data}}
          @isReadOnly={{true}}
          @key="donation"
          @label="Donation amount ($)"
          @minValue={{0}}
          @onUpdate={{parent.updateData}}
          @placeholder="100"
        />
      </template>,
    );

    assert
      .dom('[data-test-field]')
      .hasAttribute('readonly', '')
      .hasValue('1000');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    const { parent } = this;

    await render(
      <template>
        <UiFormNumber
          @data={{parent.data}}
          @isRequired={{true}}
          @key="donation"
          @label="Donation amount ($)"
          @minValue={{0}}
          @onUpdate={{parent.updateData}}
          @placeholder="100"
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Donation amount ($) *');

    assert.dom('[data-test-field]').isRequired();
  });

  test('We can pass @maxValue, @minValue, and @step to limit values', async function (this: TestContext, assert) {
    const { parent } = this;

    await render(
      <template>
        <UiFormNumber
          @data={{parent.data}}
          @key="donation"
          @label="Donation amount ($)"
          @maxValue={{500}}
          @minValue={{0}}
          @onUpdate={{parent.updateData}}
          @placeholder="100"
          @step={{10}}
        />
      </template>,
    );

    await fillIn('[data-test-field]', '0');

    assert.dom('[data-test-field]').hasValue('0');

    assert.strictEqual(parent.data['donation'], 0);

    await fillIn('[data-test-field]', '5');

    assert.dom('[data-test-field]').hasValue('');

    assert.strictEqual(parent.data['donation'], undefined);

    await fillIn('[data-test-field]', '10');

    assert.dom('[data-test-field]').hasValue('10');

    assert.strictEqual(parent.data['donation'], 10);

    await fillIn('[data-test-field]', '1000');

    assert.dom('[data-test-field]').hasValue('');

    assert.strictEqual(parent.data['donation'], undefined);
  });

  test('We can pass @onUpdate to get the updated value', async function (this: TestContext, assert) {
    const { parent } = this;

    await render(
      <template>
        <UiFormNumber
          @data={{parent.data}}
          @isRequired={{true}}
          @key="donation"
          @label="Donation amount ($)"
          @minValue={{0}}
          @onUpdate={{parent.updateData}}
          @placeholder="100"
        />
      </template>,
    );

    // Update the value
    await fillIn('[data-test-field]', '');

    assert.dom('[data-test-field]').hasNoValue();

    assert.dom('[data-test-error-message]').hasText('Please provide a value.');

    assert.strictEqual(parent.data['donation'], undefined);

    // Update the value again
    await fillIn('[data-test-field]', '10000');

    assert.dom('[data-test-field]').hasValue('10000');

    assert.dom('[data-test-error-message]').doesNotExist();

    assert.strictEqual(parent.data['donation'], 10000);
  });
});
