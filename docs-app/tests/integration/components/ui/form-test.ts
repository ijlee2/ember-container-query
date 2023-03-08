import type { TestContext } from '@ember/test-helpers';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | ui/form', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a form', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form
        @data={{hash
          email=undefined
          message="I 🧡 container queries!"
          name=undefined
          subscribe=true
        }}
        @instructions="Still have questions about ember-container-query? Try sending me a message."
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
          <F.Textarea
            @key="message"
            @label="Message"
          />
        </div>

        <div>
          <F.Checkbox
            @key="subscribe"
            @label="Subscribe to The Ember Times?"
          />
        </div>
      </Ui::Form>
    `);

    const titleId = find('[data-test-title]')!.getAttribute('id')!;
    const instructionsId = find('[data-test-instructions]')!.getAttribute(
      'id'
    )!;

    assert
      .dom('[data-test-form="Contact me"]')
      .hasAria(
        'describedby',
        instructionsId,
        'We see the correct aria-describedby.'
      )
      .hasAria('labelledby', titleId, 'We see the correct aria-labelledby.');

    assert.dom('[data-test-field]').exists({ count: 4 }, 'We see 4 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasAttribute('type', 'submit', 'We see the correct type.')
      .hasTagName('button', 'We see the correct tag name.')
      .hasText('Submit', 'We see the submit button.');
  });
});
