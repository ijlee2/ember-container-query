import { visit } from '@ember/test-helpers';
import takeSnapshot from 'dummy/tests/helpers/percy';
import resetViewport from 'dummy/tests/helpers/reset-viewport';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Acceptance | dashboard', function(hooks) {
  setupApplicationTest(hooks);
  resetViewport(hooks);


  test('@w1 @h1 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .doesNotHaveAttribute('data-container-query-tall')
      .doesNotHaveAttribute('data-container-query-square')
      .hasAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .doesNotExist('We don\'t see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText('Next', 'We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w2 @h1 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .doesNotHaveAttribute('data-container-query-tall')
      .hasAttribute('data-container-query-square')
      .doesNotHaveAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-extra-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w3 @h1 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-tall')
      .doesNotHaveAttribute('data-container-query-square')
      .doesNotHaveAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-extra-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w1 @h2 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .doesNotHaveAttribute('data-container-query-tall')
      .doesNotHaveAttribute('data-container-query-square')
      .hasAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .doesNotExist('We don\'t see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText('Next', 'We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w2 @h2 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .doesNotHaveAttribute('data-container-query-tall')
      .hasAttribute('data-container-query-square')
      .doesNotHaveAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-extra-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w3 @h2 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-tall')
      .doesNotHaveAttribute('data-container-query-square')
      .doesNotHaveAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-extra-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w1 @h3 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-tall')
      .doesNotHaveAttribute('data-container-query-square')
      .doesNotHaveAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText('Next', 'We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-square@4x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w2 @h3 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .doesNotHaveAttribute('data-container-query-tall')
      .hasAttribute('data-container-query-square')
      .doesNotHaveAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });


  test('@w3 @h3 Visual snapshot', async function(assert) {
    await visit('/dashboard');


    // Widget 1
    assert.dom('[data-test-widget="1"] [data-test-container-query]')
      .hasAttribute('data-container-query-tall')
      .doesNotHaveAttribute('data-container-query-square')
      .doesNotHaveAttribute('data-container-query-wide');


    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert.dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.27 billion', 'We see the annual revenue in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982', 'We see the relevant years in correct format.');

    assert.dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist('We don\'t see the previous button.');

    assert.dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasNoText('We see the next button in correct format.');


    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert.dom('[data-test-widget="3"] [data-test-placeholder-image]')
      .doesNotExist('We don\'t see the placeholder image.');

    assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .exists('We see the concert venue image.');

    // assert.dom('[data-test-widget="3"] [data-test-image="Concert"]')
    //   .hasAttribute('src', '/images/widgets/widget-3/venue-extra-wide@2x.jpg', 'We responsively loaded the correct image.');


    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');


    await takeSnapshot(assert);
  });
});