import { findAll, render } from '@ember/test-helpers';
import TracksList from 'docs-app/components/tracks/list';
import { album, type Track } from 'docs-app/data/album';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { assertTrackInList } from 'docs-app/tests/helpers/components/tracks';
import { module, test } from 'qunit';

module('Integration | Component | tracks/list', function (hooks) {
  setupRenderingTest(hooks);

  module('When @tracks is an empty array', function () {
    test('it renders', async function (assert) {
      const tracks: Track[] = [];

      await render(<template><TracksList @tracks={{tracks}} /></template>);

      assert.dom('[data-test-item]').doesNotExist();
    });
  });

  module('When @tracks is a non-empty array', function () {
    test('it renders', async function (assert) {
      const { tracks } = album;

      await render(<template><TracksList @tracks={{tracks}} /></template>);

      const items = findAll('[data-test-item]');

      assert.strictEqual(items.length, 11);

      assertTrackInList(assert, items[0]!, {
        title: 'Life Itself',
        length: '4:41',
        explicit: false,
      });

      assertTrackInList(assert, items[10]!, {
        title: 'Agnes',
        length: '4:32',
        explicit: true,
      });
    });
  });
});
