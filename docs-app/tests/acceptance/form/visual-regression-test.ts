import { visit } from '@ember/test-helpers';
import {
  setupApplicationTest,
  takeSnapshot,
  timeout,
} from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await visit('/form');
    await timeout();
  });

  test('@w1 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w2 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w3 @h1 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w1 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w2 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w3 @h2 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w1 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w2 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });

  test('@w3 @h3 Visual snapshot', async function (assert) {
    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 5 }, 'We see 5 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');

    await takeSnapshot(assert);
  });
});
