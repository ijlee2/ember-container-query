import {
  findAll,
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import TracksTable from 'docs-app/components/tracks/table';
import { album, type Track } from 'docs-app/data/album';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

type TrackProperties = {
  explicit: boolean;
  length: string;
  title: string;
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
    assert.isTrackCorrect = (trackElement, trackProperties): void => {
      const { explicit, length, title } = trackProperties;

      assert.dom('[data-test-column="Title"]', trackElement).hasText(title);

      assert.dom('[data-test-column="Length"]', trackElement).hasText(length);

      assert
        .dom('[data-test-column="Explicit"]', trackElement)
        .hasText(explicit ? 'Yes' : '');
    };
  });

  hooks.afterEach(function (assert: CustomAssert) {
    delete assert.isTrackCorrect;
  });

  module('When @tracks is an empty array', function () {
    test('it renders', async function (this: TestContext, assert: CustomAssert) {
      this.tracks = [];

      const self = this;

      await render(
        <template><TracksTable @tracks={{self.tracks}} /></template>,
      );

      assert.dom('[data-test-row]').doesNotExist();
    });
  });

  module('When @tracks is a non-empty array', function () {
    test('it renders', async function (this: TestContext, assert: CustomAssert) {
      this.tracks = album.tracks;

      const self = this;

      await render(
        <template><TracksTable @tracks={{self.tracks}} /></template>,
      );

      const tracks = findAll('[data-test-row]');

      assert.strictEqual(tracks.length, 11);

      assert.isTrackCorrect!(tracks[0]!, {
        title: 'Life Itself',
        length: '4:41',
        explicit: false,
      });

      assert.isTrackCorrect!(tracks[10]!, {
        title: 'Agnes',
        length: '4:32',
        explicit: true,
      });
    });
  });
});
