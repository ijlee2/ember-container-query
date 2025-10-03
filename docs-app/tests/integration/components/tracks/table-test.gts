import TracksTable from 'docs-app/components/tracks/table';

import {
  findAll,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { album, type Track } from 'docs-app/data';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

type TrackProperties = {
  explicit: boolean;
  length: string;
  title: string;
  trackNumber: number;
};

interface CustomAssert extends Assert {
  isTrackCorrect?: (
    trackElement: Element,
    trackProperties: TrackProperties,
  ) => void;
}

interface TestContext extends BaseTestContext {
  tracks: Track[];
}

module('Integration | Component | tracks/table', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert: CustomAssert) {
    assert.isTrackCorrect = (trackElement, trackProperties) => {
      const { explicit, length, title, trackNumber } = trackProperties;

      assert
        .dom('[data-test-column="Title"]', trackElement)
        .hasText(
          title,
          `For track #${trackNumber}, the Title column is correct.`,
        );

      assert
        .dom('[data-test-column="Length"]', trackElement)
        .hasText(
          length,
          `For track #${trackNumber}, the Length column is correct.`,
        );

      assert
        .dom('[data-test-column="Explicit"]', trackElement)
        .hasText(
          explicit ? 'Yes' : '',
          `For track #${trackNumber}, the Explicit column is correct.`,
        );
    };
  });

  hooks.afterEach(function (assert: CustomAssert) {
    delete assert.isTrackCorrect;
  });

  module('When @tracks is an empty array', function () {
    test('The component renders an empty table', async function (this: TestContext, assert: CustomAssert) {
      this.tracks = [];

      const self = this;




      await render(<template>
      <TracksTable @tracks={{self.tracks}} />
      </template>);

      assert.dom('[data-test-row]').doesNotExist('There are 0 tracks.');
    });
  });

  module('When @tracks is a non-empty array', function () {
    test('The component renders a non-empty table', async function (this: TestContext, assert: CustomAssert) {
      this.tracks = album.tracks;

      const self = this;




      await render(<template>
      <TracksTable @tracks={{self.tracks}} />
      </template>);

      const tracks = findAll('[data-test-row]');

      assert.strictEqual(tracks.length, 11, 'There are 11 tracks.');

      assert.isTrackCorrect!(tracks[0]!, {
        trackNumber: 1,
        title: 'Life Itself',
        length: '4:41',
        explicit: false,
      });

      assert.isTrackCorrect!(tracks[10]!, {
        trackNumber: 11,
        title: 'Agnes',
        length: '4:32',
        explicit: true,
      });
    });
  });
});
