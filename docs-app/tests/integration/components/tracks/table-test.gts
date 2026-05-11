import { findAll, render } from '@ember/test-helpers';
import TracksTable from 'docs-app/components/tracks/table';
import { album, type Track } from 'docs-app/data/album';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { assertTrackInTable } from 'docs-app/tests/helpers/components/tracks';
import { module, test } from 'qunit';

module('Integration | Component | tracks/table', function (hooks) {
  setupRenderingTest(hooks);

  module('When @tracks is an empty array', function () {
    test('it renders', async function (assert) {
      const tracks: Track[] = [];

      await render(<template><TracksTable @tracks={{tracks}} /></template>);

      assert.dom('[data-test-row]').doesNotExist();
    });
  });

  module('When @tracks is a non-empty array', function () {
    test('it renders', async function (assert) {
      const { tracks } = album;

      await render(<template><TracksTable @tracks={{tracks}} /></template>);

      const rows = findAll('[data-test-row]');

      assert.strictEqual(rows.length, 11);

      assertTrackInTable(assert, rows[0]!, {
        title: 'Life Itself',
        length: '4:41',
        explicit: false,
      });

      assertTrackInTable(assert, rows[10]!, {
        title: 'Agnes',
        length: '4:32',
        explicit: true,
      });
    });
  });
});
