/* eslint-disable qunit/require-expect */
import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest, takeSnapshot, timeout } from '../../helpers';

module('Acceptance | album', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await visit('/album');
    await timeout();
  });

  test('@w1 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see the album tracks in a list.')
      .hasAttribute(
        'data-css-grid',
        '11 x 1',
        'We see 11 tracks in an 11 x 1 grid.'
      );

    assert
      .dom('[data-test-track-lyrics]')
      .doesNotExist("We don't see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w2 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see the album tracks in a list.')
      .hasAttribute(
        'data-css-grid',
        '4 x 3',
        'We see 11 tracks in a 4 x 3 grid.'
      );

    assert
      .dom('[data-test-track-lyrics]')
      .doesNotExist("We don't see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w3 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-table="Tracks"]')
      .exists('We see the album tracks in a table.');

    assert
      .dom('[data-test-table="Tracks"] [data-test-row]')
      .exists({ count: 11 }, 'We see 11 tracks.');

    assert
      .dom('[data-test-track-lyrics]')
      .exists("We see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w1 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see the album tracks in a list.')
      .hasAttribute(
        'data-css-grid',
        '11 x 1',
        'We see 11 tracks in an 11 x 1 grid.'
      );

    assert
      .dom('[data-test-track-lyrics]')
      .doesNotExist("We don't see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w2 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see the album tracks in a list.')
      .hasAttribute(
        'data-css-grid',
        '4 x 3',
        'We see 11 tracks in a 4 x 3 grid.'
      );

    assert
      .dom('[data-test-track-lyrics]')
      .doesNotExist("We don't see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w3 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-table="Tracks"]')
      .exists('We see the album tracks in a table.');

    assert
      .dom('[data-test-table="Tracks"] [data-test-row]')
      .exists({ count: 11 }, 'We see 11 tracks.');

    assert
      .dom('[data-test-track-lyrics]')
      .exists("We see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w1 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see the album tracks in a list.')
      .hasAttribute(
        'data-css-grid',
        '11 x 1',
        'We see 11 tracks in an 11 x 1 grid.'
      );

    assert
      .dom('[data-test-track-lyrics]')
      .doesNotExist("We don't see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w2 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-list="Tracks"]')
      .exists('We see the album tracks in a list.')
      .hasAttribute(
        'data-css-grid',
        '4 x 3',
        'We see 11 tracks in a 4 x 3 grid.'
      );

    assert
      .dom('[data-test-track-lyrics]')
      .doesNotExist("We don't see the current track's lyrics.");

    await takeSnapshot(assert);
  });

  test('@w3 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-table="Tracks"]')
      .exists('We see the album tracks in a table.');

    assert
      .dom('[data-test-table="Tracks"] [data-test-row]')
      .exists({ count: 11 }, 'We see 11 tracks.');

    assert
      .dom('[data-test-track-lyrics]')
      .exists("We see the current track's lyrics.");

    await takeSnapshot(assert);
  });
});
