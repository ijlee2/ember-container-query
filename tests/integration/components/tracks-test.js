import { render } from '@ember/test-helpers';
import albumData from 'dummy/data/album';
import resizeWindow from 'dummy/tests/helpers/resize-window';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | tracks', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.album = albumData;
  });


  test('uses container queries to render tracks', async function(assert) {
    // Features: small, short
    await render(hbs`
      <div
        data-test-parent-element
        style="width: 240px; height: 240px;"
      >
        <Tracks
          @tracks={{this.album.tracks}}
        />
      </div>
    `);

    assert.dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute('data-css-grid', '11 x 1', 'The list is shown in an 11 x 1 grid.');

    assert.dom('[data-test-table="Tracks"]')
      .doesNotExist('We don\'t see a table.');


    // Features: medium, short
    await resizeWindow(560, 240);

    assert.dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute('data-css-grid', '6 x 2', 'The list is shown in a 6 x 2 grid.');

    assert.dom('[data-test-table="Tracks"]')
      .doesNotExist('We don\'t see a table.');


    // Features: large, short
    await resizeWindow(880, 240);

    assert.dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute('data-css-grid', '4 x 3', 'The list is shown in a 4 x 3 grid.');

    assert.dom('[data-test-table="Tracks"]')
      .doesNotExist('We don\'t see a table.');


    // Features: small, tall
    await resizeWindow(240, 640);

    assert.dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute('data-css-grid', '11 x 1', 'The list is shown in an 11 x 1 grid.');

    assert.dom('[data-test-table="Tracks"]')
      .doesNotExist('We don\'t see a table.');


    // Features: medium, tall
    await resizeWindow(560, 640);

    assert.dom('[data-test-list="Tracks"]')
      .exists('We see a list.')
      .hasAttribute('data-css-grid', '6 x 2', 'The list is shown in a 6 x 2 grid.');

    assert.dom('[data-test-table="Tracks"]')
      .doesNotExist('We don\'t see a table.');


    // Features: large, tall
    await resizeWindow(880, 640);

    assert.dom('[data-test-list="Tracks"]')
      .doesNotExist('We don\'t see a list.');

    assert.dom('[data-test-table="Tracks"]')
      .exists('We see a table.');
  });
});