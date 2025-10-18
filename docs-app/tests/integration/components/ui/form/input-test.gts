import { set } from '@ember/object';
import {
  fillIn,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import UiFormInput from 'docs-app/components/ui/form/input';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  data: Record<string, any>;
  updateData: ({ key, value }: { key: string; value: unknown }) => void;
}

module('Integration | Component | ui/form/input', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.data = {
      email: 'zoey@emberjs.com',
      message: 'I 🧡 CSS modules!',
      name: 'Zoey',
      subscribe: false,
    };

    this.updateData = () => {
      // Do nothing
    };
  });

  test('it renders', async function (this: TestContext, assert) {
    const { data, updateData } = this;

    await render(
      <template>
        <UiFormInput
          @data={{data}}
          @key="name"
          @label="Name"
          @onUpdate={{updateData}}
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Name');

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('readonly')
      .hasAttribute('type', 'text')
      .hasTagName('input')
      .hasValue('Zoey')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-error-message]').doesNotExist();
  });

  test('We can pass @isDisabled to disable the input', async function (this: TestContext, assert) {
    const { data, updateData } = this;

    await render(
      <template>
        <UiFormInput
          @data={{data}}
          @isDisabled={{true}}
          @key="name"
          @label="Name"
          @onUpdate={{updateData}}
        />
      </template>,
    );

    assert.dom('[data-test-field]').isDisabled();
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    const { data, updateData } = this;

    await render(
      <template>
        <UiFormInput
          @data={{data}}
          @isReadOnly={{true}}
          @key="name"
          @label="Name"
          @onUpdate={{updateData}}
        />
      </template>,
    );

    assert
      .dom('[data-test-field]')
      .hasAttribute('readonly', '')
      .hasValue('Zoey');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    const { data, updateData } = this;

    await render(
      <template>
        <UiFormInput
          @data={{data}}
          @isRequired={{true}}
          @key="name"
          @label="Name"
          @onUpdate={{updateData}}
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Name *');

    assert.dom('[data-test-field]').isRequired();
  });

  test('We can pass @onUpdate to get the updated value', async function (this: TestContext, assert) {
    const { data } = this;

    let expectedValue = '';

    const updateData = ({ key, value }: { key: string; value: unknown }) => {
      assert.step('onUpdate');

      assert.strictEqual(value, expectedValue);

      set(data, key, value);
    };

    await render(
      <template>
        <UiFormInput
          @data={{data}}
          @isRequired={{true}}
          @key="name"
          @label="Name"
          @onUpdate={{updateData}}
        />
      </template>,
    );

    // Update the value
    await fillIn('[data-test-field]', '');

    assert.dom('[data-test-field]').hasValue('');

    assert.dom('[data-test-error-message]').hasText('Please provide a value.');

    // Update the value again
    expectedValue = 'Tomster';

    await fillIn('[data-test-field]', 'Tomster');

    assert.dom('[data-test-field]').hasValue('Tomster');

    assert.dom('[data-test-error-message]').doesNotExist();

    assert.verifySteps(['onUpdate', 'onUpdate']);
  });

  test('We can pass @type to create an email input', async function (this: TestContext, assert) {
    const { data, updateData } = this;

    await render(
      <template>
        <UiFormInput
          @data={{data}}
          @key="email"
          @label="Email"
          @onUpdate={{updateData}}
          @type="email"
        />
      </template>,
    );

    assert.dom('[data-test-label]').hasText('Email');

    assert
      .dom('[data-test-field]')
      .doesNotHaveAttribute('readonly')
      .hasAttribute('type', 'email')
      .hasTagName('input')
      .hasValue('zoey@emberjs.com')
      .isEnabled()
      .isNotRequired();

    assert.dom('[data-test-error-message]').doesNotExist();
  });
});
