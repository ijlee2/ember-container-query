import { findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | navigation-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a navigation menu', async function (assert) {
    await render(hbs`
      <NavigationMenu
        @name="Main Navigation"
        @menuItems={{array
          (hash route="index" label="Home")
          (hash route="album" label="Album")
          (hash route="dashboard" label="Dashboard")
          (hash route="form" label="Form")
        }}
      />
    `);

    assert
      .dom('[data-test-nav="Main Navigation"]')
      .hasAria(
        'label',
        'Main Navigation',
        'We can pass @name to specify the navigation.'
      )
      .hasTagName('nav', 'We see the correct tag name.');

    const links = findAll('[data-test-link]');

    assert.strictEqual(links.length, 4, 'We see 4 links.');

    assert
      .dom(links[0])
      .hasAttribute('href', '/', 'We see the correct href for the 1st link.')
      .hasText('Home', 'We see the correct label for the 1st link.');

    assert
      .dom(links[1])
      .hasAttribute(
        'href',
        '/album',
        'We see the correct href for the 2nd link.'
      )
      .hasText('Album', 'We see the correct label for the 2nd link.');

    assert
      .dom(links[2])
      .hasAttribute(
        'href',
        '/dashboard',
        'We see the correct href for the 3rd link.'
      )
      .hasText('Dashboard', 'We see the correct label for the 3rd link.');

    assert
      .dom(links[3])
      .hasAttribute(
        'href',
        '/form',
        'We see the correct href for the 4th link.'
      )
      .hasText('Form', 'We see the correct label for the 4th link.');
  });
});
