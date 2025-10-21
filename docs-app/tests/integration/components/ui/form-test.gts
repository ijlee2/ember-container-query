import { hash } from '@ember/helper';
import { find, render } from '@ember/test-helpers';
import UiForm from 'docs-app/components/ui/form';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

module('Integration | Component | ui/form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const doNothing = () => {};

    await render(
      <template>
        <UiForm
          @data={{hash
            donation=undefined
            email=undefined
            message="I 🧡 container queries!"
            name=undefined
            subscribe=true
          }}
          @instructions="Still have questions about ember-container-query? Try sending me a message."
          {{! @glint-expect-error: Incorrect type }}
          @onSubmit={{doNothing}}
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
            <F.Checkbox
              @key="subscribe"
              @label="Subscribe to The Ember Times?"
            />
          </div>

          <div>
            <F.Number
              @key="donation"
              @label="Donation amount ($)"
              @minValue={{0}}
              @placeholder="100"
              @step={{10}}
            />
          </div>
        </UiForm>
      </template>,
    );

    const titleId = find('[data-test-title]')!.getAttribute('id')!;
    const instructionsId = find('[data-test-instructions]')!.getAttribute(
      'id',
    )!;

    assert
      .dom('[data-test-form="Contact me"]')
      .hasAria('describedby', instructionsId)
      .hasAria('labelledby', titleId);

    assert.dom('[data-test-field]').exists({ count: 5 });

    assert
      .dom('[data-test-button="Submit"]')
      .hasAttribute('type', 'submit')
      .hasTagName('button')
      .hasText('Submit');

    await a11yAudit();
  });
});
