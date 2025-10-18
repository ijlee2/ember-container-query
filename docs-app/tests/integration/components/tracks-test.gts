import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import Tracks from 'docs-app/components/tracks';
import { type Album, album } from 'docs-app/data/album';
import { resizeContainer, setupRenderingTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  album: Album;
}

module('Integration | Component | tracks', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.album = album;
  });

  test('uses container queries to render tracks', async function (this: TestContext, assert) {
    const self = this;

    // Features: small, short
    await render(
      <template>
        {{! template-lint-disable no-inline-styles }}
        <div data-test-parent-element style="width: 240px; height: 240px;">
          <Tracks @tracks={{self.album.tracks}} />
        </div>
      </template>,
    );

    assert
      .dom('[data-test-list="Tracks"]')
      .hasAttribute('data-css-grid', '11 x 1');

    assert.dom('[data-test-table="Tracks"]').doesNotExist();

    // Features: medium, short
    await resizeContainer({ height: 240, width: 560 });

    assert
      .dom('[data-test-list="Tracks"]')
      .hasAttribute('data-css-grid', '6 x 2');

    assert.dom('[data-test-table="Tracks"]').doesNotExist();

    // Features: large, short
    await resizeContainer({ height: 240, width: 880 });

    assert
      .dom('[data-test-list="Tracks"]')
      .hasAttribute('data-css-grid', '4 x 3');

    assert.dom('[data-test-table="Tracks"]').doesNotExist();

    // Features: small, tall
    await resizeContainer({ height: 640, width: 240 });

    assert
      .dom('[data-test-list="Tracks"]')
      .hasAttribute('data-css-grid', '11 x 1');

    assert.dom('[data-test-table="Tracks"]').doesNotExist();

    // Features: medium, tall
    await resizeContainer({ height: 640, width: 560 });

    assert
      .dom('[data-test-list="Tracks"]')
      .hasAttribute('data-css-grid', '6 x 2');

    assert.dom('[data-test-table="Tracks"]').doesNotExist();

    // Features: large, tall
    await resizeContainer({ height: 640, width: 880 });

    assert.dom('[data-test-list="Tracks"]').doesNotExist();

    assert.dom('[data-test-table="Tracks"]').exists();
  });
});
