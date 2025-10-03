import { hash } from '@ember/helper';
import UiForm from 'docs-app/components/ui/form';

import {
  click,
  fillIn,
  find,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  submitForm: (data: Record<string, any>) => Promise<void>;
}

module('Integration | Component | ui/form', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a form', async function (this: TestContext, assert) {
    // eslint-disable-next-line @typescript-eslint/require-await
    this.submitForm = async () => {
      assert.step('Submit form');
    };

    const self = this;




    await render(<template>
    <UiForm
    @data={{hash
      donation=undefined
      email=undefined
      message="I 🧡 container queries!"
      name=undefined
      subscribe=true
    }}
    @instructions="Still have questions about ember-container-query? Try sending me a message."
    @onSubmit={{self.submitForm}}
    @title="Contact me"
    as |F|
    >
    <div>
      <F.Input
        @isRequired={{true}}
        @key="name"
        @label="Name"
        @placeholder="Zoey"
      />
    </div>

    <div>
      <F.Input
        @isRequired={{true}}
        @key="email"
        @label="Email"
        @placeholder="zoey@emberjs.com"
        @type="email"
      />
    </div>

    <div>
      <F.Textarea @key="message" @label="Message" />
    </div>

    <div>
      <F.Checkbox @key="subscribe" @label="Subscribe to The Ember Times?" />
    </div>

    <div>
      <F.Number
        @key="donation"
        @label="Donation amount (\$)"
        @minValue={{0}}
        @placeholder="100"
        @step={{10}}
      />
    </div>
    </UiForm>
    </template>);

    const titleId = find('[data-test-title]')!.getAttribute('id')!;
    const instructionsId = find('[data-test-instructions]')!.getAttribute(
      'id',
    )!;

    assert
      .dom('[data-test-form="Contact me"]')
      .hasAria(
        'describedby',
        instructionsId,
        'We see the correct aria-describedby.',
      )
      .hasAria('labelledby', titleId, 'We see the correct aria-labelledby.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasAttribute('type', 'submit', 'We see the correct type.')
      .hasTagName('button', 'We see the correct tag name.')
      .hasText('Submit', 'We see the submit button.');

    assert.verifySteps([], 'We should not call @onSubmit.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('We can submit the form', async function (this: TestContext, assert) {
    // eslint-disable-next-line @typescript-eslint/require-await
    this.submitForm = async (data: Record<string, any>) => {
      assert.deepEqual(
        data,
        {
          donation: 10000,
          email: 'zoey@emberjs.com',
          message: 'Gude!',
          name: 'Zoey',
          subscribe: false,
        },
        'We send the correct data.',
      );

      assert.step('Submit form');
    };

    const self = this;




    await render(<template>
    <UiForm
    @data={{hash
      donation=undefined
      email=undefined
      message="I 🧡 container queries!"
      name=undefined
      subscribe=true
    }}
    @onSubmit={{self.submitForm}}
    as |F|
    >
    <div>
      <F.Input
        @isRequired={{true}}
        @key="name"
        @label="Name"
        @placeholder="Zoey"
      />
    </div>

    <div>
      <F.Input
        @isRequired={{true}}
        @key="email"
        @label="Email"
        @placeholder="zoey@emberjs.com"
        @type="email"
      />
    </div>

    <div>
      <F.Textarea @key="message" @label="Message" />
    </div>

    <div>
      <F.Checkbox @key="subscribe" @label="Subscribe to The Ember Times?" />
    </div>

    <div>
      <F.Number
        @key="donation"
        @label="Donation amount (\$)"
        @minValue={{0}}
        @placeholder="100"
        @step={{10}}
      />
    </div>
    </UiForm>
    </template>);

    await fillIn('[data-test-field="Name"]', 'Zoey');
    await fillIn('[data-test-field="Email"]', 'zoey@emberjs.com');
    await fillIn('[data-test-field="Message"]', 'Gude!');
    await click('[data-test-field="Subscribe to The Ember Times?"]');
    await fillIn('[data-test-field="Donation amount ($)"]', '10000');

    await click('[data-test-button="Submit"]');

    assert.verifySteps(['Submit form'], 'We called @onSubmit once.');
  });
});
