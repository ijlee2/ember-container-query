import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | form', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a form', async function (assert) {
    await render(hbs`
      <Form
        @data={{hash
          email=undefined
          message="I 🧡 container queries!"
          name=undefined
          subscribe=true
        }}
        @instructions="Still have questions about ember-container-query? Try sending me a message."
        @title="Contact me"
      >
      </Form>
    `);

    const titleId = find('[data-test-title]').getAttribute('id');
    const instructionsId = find('[data-test-instructions]').getAttribute('id');

    assert
      .dom('[data-test-form="Contact me"]')
      .hasAria(
        'describedby',
        instructionsId,
        'We see the correct aria-describedby.'
      )
      .hasAria('labelledby', titleId, 'We see the correct aria-labelledby.');

    assert.dom('[data-test-field]').exists({ count: 0 }, 'We see 0 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasAttribute('type', 'submit', 'We see the correct type.')
      .hasTagName('button', 'We see the correct tag name.')
      .hasText('Submit', 'We see the submit button.');
  });
});
