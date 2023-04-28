import { array, hash } from '@ember/helper';
import { findAll, render } from '@ember/test-helpers';
import NavigationMenu from 'docs-app/components/navigation-menu';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | navigation-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a navigation menu', async function (assert) {
    await render(
      <template>
        <NavigationMenu
          @menuItems={{array
            (hash label="Home" route="index")
            (hash label="Album" route="album")
            (hash label="Dashboard" route="dashboard")
            (hash label="Form" route="form")
            (hash label="Products" route="products")
          }}
          @name="Main Navigation"
        />
      </template>
    );

    assert
      .dom('[data-test-nav="Main Navigation"]')
      .hasAria(
        'label',
        'Main Navigation',
        'We can pass @name to specify the navigation.'
      )
      .hasTagName('nav', 'We see the correct tag name.');

    const links = findAll('[data-test-link]');

    assert.strictEqual(links.length, 5, 'We see 5 links.');

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

    assert
      .dom(links[4])
      .hasAttribute(
        'href',
        '/products',
        'We see the correct href for the 5th link.'
      )
      .hasText('Products', 'We see the correct label for the 5th link.');
  });
});
