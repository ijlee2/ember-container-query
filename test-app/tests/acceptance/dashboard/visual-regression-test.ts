/* eslint-disable qunit/require-expect */
import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest, takeSnapshot, timeout } from '../../helpers';

module('Acceptance | dashboard', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await visit('/dashboard');
    await timeout();
  });

  test('@w1 @h1 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-wide');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .doesNotExist("We don't see the visualization.");

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText('Next', 'We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .hasClass(/minimal-layout/, 'The memo header uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .hasClass(/minimal-layout/, 'The memo body uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .hasClass(/minimal-layout/, 'The memo actions uses the minimal layout.');

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText('ember-container-query', 'We see the correct call to action.');

    await takeSnapshot(assert);
  });

  test('@w2 @h1 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-square');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .hasClass(/minimal-layout/, 'The memo header uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .hasClass(/minimal-layout/, 'The memo body uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .hasClass(/minimal-layout/, 'The memo actions uses the minimal layout.');

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText('ember-container-query', 'We see the correct call to action.');

    await takeSnapshot(assert);
  });

  test('@w3 @h1 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-tall');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-extra-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo header doesn't use the minimal layout."
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo body doesn't use the minimal layout."
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo actions doesn't use the minimal layout."
      );

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText(
        'What will you create with ember-container-query ?',
        'We see the correct call to action.'
      );

    await takeSnapshot(assert);
  });

  test('@w1 @h2 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-wide');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .doesNotExist("We don't see the visualization.");

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText('Next', 'We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .hasClass(/minimal-layout/, 'The memo header uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .hasClass(/minimal-layout/, 'The memo body uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .hasClass(/minimal-layout/, 'The memo actions uses the minimal layout.');

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText('ember-container-query', 'We see the correct call to action.');

    await takeSnapshot(assert);
  });

  test('@w2 @h2 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-square');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .hasClass(/minimal-layout/, 'The memo header uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .hasClass(/minimal-layout/, 'The memo body uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .hasClass(/minimal-layout/, 'The memo actions uses the minimal layout.');

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText('ember-container-query', 'We see the correct call to action.');

    await takeSnapshot(assert);
  });

  test('@w3 @h2 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-tall');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-extra-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo header doesn't use the minimal layout."
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo body doesn't use the minimal layout."
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo actions doesn't use the minimal layout."
      );

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText(
        'What will you create with ember-container-query ?',
        'We see the correct call to action.'
      );

    await takeSnapshot(assert);
  });

  test('@w1 @h3 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-wide');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .doesNotExist("We don't see the visualization.");

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText('Next', 'We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .hasClass(/minimal-layout/, 'The memo header uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .hasClass(/minimal-layout/, 'The memo body uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .hasClass(/minimal-layout/, 'The memo actions uses the minimal layout.');

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText('ember-container-query', 'We see the correct call to action.');

    await takeSnapshot(assert);
  });

  test('@w2 @h3 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-square');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-extra-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .hasClass(/minimal-layout/, 'The memo header uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .hasClass(/minimal-layout/, 'The memo body uses the minimal layout.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .hasClass(/minimal-layout/, 'The memo actions uses the minimal layout.');

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText('ember-container-query', 'We see the correct call to action.');

    await takeSnapshot(assert);
  });

  test('@w3 @h3 Visual snapshot', async function (assert) {
    // Widget 1
    assert
      .dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-tall');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.'
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        '/images/widgets/widget-3/venue-extra-wide@2x.jpg',
        'We see the concert image.'
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo header doesn't use the minimal layout."
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo body doesn't use the minimal layout."
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo actions doesn't use the minimal layout."
      );

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText(
        'What will you create with ember-container-query ?',
        'We see the correct call to action.'
      );

    await takeSnapshot(assert);
  });
});
