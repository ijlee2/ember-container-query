import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import type { Album } from 'dummy/data/album';
import albumData from 'dummy/data/album';
import { resizeContainer, setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  album: Album;
}

module('Integration | Component | tracks', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.album = albumData;
  });

  test('uses container queries to render tracks', async function (assert) {
    // Features: small, short
    await render(hbs`
      {{!-- template-lint-disable no-inline-styles --}}
      <div
        data-test-parent-element
        style="width: 240px; height: 240px;"
      >
        <Tracks
          @tracks={{this.album.tracks}}
        />
      </div>
    `);

    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute(
        'data-css-grid',
        '11 x 1',
        'The list is shown in an 11 x 1 grid.'
      );

    assert
      .dom('[data-test-table="Tracks"]')
      .doesNotExist("We don't see a table.");

    // Features: medium, short
    await resizeContainer({ height: 240, width: 560 });

    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute(
        'data-css-grid',
        '6 x 2',
        'The list is shown in a 6 x 2 grid.'
      );

    assert
      .dom('[data-test-table="Tracks"]')
      .doesNotExist("We don't see a table.");

    // Features: large, short
    await resizeContainer({ height: 240, width: 880 });

    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute(
        'data-css-grid',
        '4 x 3',
        'The list is shown in a 4 x 3 grid.'
      );

    assert
      .dom('[data-test-table="Tracks"]')
      .doesNotExist("We don't see a table.");

    // Features: small, tall
    await resizeContainer({ height: 640, width: 240 });

    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute(
        'data-css-grid',
        '11 x 1',
        'The list is shown in an 11 x 1 grid.'
      );

    assert
      .dom('[data-test-table="Tracks"]')
      .doesNotExist("We don't see a table.");

    // Features: medium, tall
    await resizeContainer({ height: 640, width: 560 });

    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute(
        'data-css-grid',
        '6 x 2',
        'The list is shown in a 6 x 2 grid.'
      );

    assert
      .dom('[data-test-table="Tracks"]')
      .doesNotExist("We don't see a table.");

    // Features: large, tall
    await resizeContainer({ height: 640, width: 880 });

    assert
      .dom('[data-test-list="Tracks"]')
      .doesNotExist("We don't see a list.");

    assert.dom('[data-test-table="Tracks"]').exists('We see a table.');
  });
});
