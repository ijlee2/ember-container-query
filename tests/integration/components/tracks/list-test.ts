import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { findAll, render } from '@ember/test-helpers';
import type { Track } from 'dummy/data/album';
import albumData from 'dummy/data/album';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

type TrackProperties = {
  explicit: boolean;
  length: string;
  title: string;
  trackNumber: number;
};

interface CustomAssert extends Assert {
  isTrackCorrect?: (
    trackElement: Element,
    trackProperties: TrackProperties
  ) => void;
}

interface TestContext extends BaseTestContext {
  tracks: Array<Track>;
}

module('Integration | Component | tracks/list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert: CustomAssert) {
    assert.isTrackCorrect = (trackElement, trackProperties) => {
      const { explicit, title, trackNumber } = trackProperties;

      assert
        .dom('[data-test-field="Title"]', trackElement)
        .hasText(
          title,
          `For track #${trackNumber}, the Title field is correct.`
        );

      assert
        .dom('[data-test-field="Explicit"]', trackElement)
        .exists(
          { count: explicit ? 1 : 0 },
          `For track #${trackNumber}, the Explicit field is correct.`
        );
    };
  });

  hooks.afterEach(function (assert: CustomAssert) {
    delete assert.isTrackCorrect;
  });

  module('When @tracks is an empty array', function () {
    test('The component renders an empty list', async function (this: TestContext, assert: CustomAssert) {
      this.tracks = [];

      await render<TestContext>(hbs`
        <Tracks::List
          @tracks={{this.tracks}}
        />
      `);

      assert.dom('[data-test-item]').doesNotExist('There are 0 tracks.');
    });
  });

  module('When @tracks is a non-empty array', function () {
    test('The component renders a non-empty list', async function (this: TestContext, assert: CustomAssert) {
      this.tracks = albumData.tracks;

      await render<TestContext>(hbs`
        <Tracks::List
          @tracks={{this.tracks}}
        />
      `);

      const tracks = findAll('[data-test-item]');

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
