import { findAll, render } from '@ember/test-helpers';
import albumData from 'dummy/data/album';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Component | tracks/table', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    assert.isTrackCorrect = (trackElement, { trackNumber, title, length, explicit }) => {
      assert
        .dom('[data-test-column="Title"]', trackElement)
        .hasText(title, `For track #${trackNumber}, the Title column is correct.`);

      assert
        .dom('[data-test-column="Length"]', trackElement)
        .hasText(length, `For track #${trackNumber}, the Length column is correct.`);

      assert
        .dom('[data-test-column="Explicit"]', trackElement)
        .hasText(
          explicit ? 'Yes' : '',
          `For track #${trackNumber}, the Explicit column is correct.`
        );
    };
  });

  hooks.afterEach(function (assert) {
    delete assert.isTrackCorrect;
  });

  module('When @tracks is undefined', function () {
    test('The component renders an empty table', async function (assert) {
      await render(hbs`
        <Tracks::Table />
      `);

      assert.dom('[data-test-row]').doesNotExist('There are 0 tracks.');
    });
  });

  module('When @tracks is passed', function (hooks) {
    hooks.beforeEach(function () {
      this.album = albumData;
    });

    test('The component renders a table with tracks', async function (assert) {
      await render(hbs`
        <Tracks::Table
          @tracks={{this.album.tracks}}
        />
      `);

      const tracks = findAll('[data-test-row]');

      assert.strictEqual(tracks.length, 11, 'There are 11 tracks.');

      assert.isTrackCorrect(tracks[0], {
        trackNumber: 1,
        title: 'Life Itself',
        length: '4:41',
        explicit: false,
      });

      assert.isTrackCorrect(tracks[2], {
        trackNumber: 3,
        title: 'Season 2 Episode 3',
        length: '4:04',
        explicit: false,
      });

      assert.isTrackCorrect(tracks[6], {
        trackNumber: 7,
        title: '[Premade Sandwiches]',
        length: '0:36',
        explicit: true,
      });

      assert.isTrackCorrect(tracks[10], {
        trackNumber: 11,
        title: 'Agnes',
        length: '4:32',
        explicit: true,
      });
    });
  });
});
