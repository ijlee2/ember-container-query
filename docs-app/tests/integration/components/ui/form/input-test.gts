import UiFormInput from 'docs-app/components/ui/form/input';

import { set } from '@ember/object';
import {
  fillIn,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  changeset: Record<string, any>;
  updateChangeset: ({ key, value }: { key: string; value: any }) => void;
}

module('Integration | Component | ui/form/input', function (hooks) {
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

  test('The component renders a label and an input', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormInput
    @changeset={{self.changeset}}
    @key="name"
    @label="Name"
    @onUpdate={{self.updateChangeset}}
    />
    </template>);

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
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });

  test('We can pass @isDisabled to disable the input', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormInput
    @changeset={{self.changeset}}
    @isDisabled={{true}}
    @key="name"
    @label="Name"
    @onUpdate={{self.updateChangeset}}
    />
    </template>);

    assert.dom('[data-test-field="Name"]').isDisabled('The input is disabled.');
  });

  test('We can pass @isReadOnly to display the value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormInput
    @changeset={{self.changeset}}
    @isReadOnly={{true}}
    @key="name"
    @label="Name"
    @onUpdate={{self.updateChangeset}}
    />
    </template>);

    assert
      .dom('[data-test-field="Name"]')
      .hasAttribute('readonly', '', 'We see the readonly attribute.')
      .hasValue('Zoey', 'We see the correct value.');
  });

  test('We can pass @isRequired to require a value', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormInput
    @changeset={{self.changeset}}
    @isRequired={{true}}
    @key="name"
    @label="Name"
    @onUpdate={{self.updateChangeset}}
    />
    </template>);

    assert
      .dom('[data-test-label]')
      .hasText('Name *', 'The label shows that the field is required.');

    assert.dom('[data-test-field="Name"]').isRequired('The input is required.');
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

    const self = this;




    await render(<template>
    <UiFormInput
    @changeset={{self.changeset}}
    @isRequired={{true}}
    @key="name"
    @label="Name"
    @onUpdate={{self.updateChangeset}}
    />
    </template>);

    // Update the value
    await fillIn('[data-test-field="Name"]', '');

    assert
      .dom('[data-test-field="Name"]')
      .hasValue('', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .hasText('Please provide a value.', 'We see an error message.');

    // Update the value again
    expectedValue = 'Tomster';

    await fillIn('[data-test-field="Name"]', 'Tomster');

    assert
      .dom('[data-test-field="Name"]')
      .hasValue('Tomster', 'We see the correct value.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');

    assert.verifySteps(['onUpdate', 'onUpdate']);
  });

  test('We can pass @type to create an email input', async function (this: TestContext, assert) {
    const self = this;




    await render(<template>
    <UiFormInput
    @changeset={{self.changeset}}
    @key="email"
    @label="Email"
    @onUpdate={{self.updateChangeset}}
    @type="email"
    />
    </template>);

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
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');
  });
});
