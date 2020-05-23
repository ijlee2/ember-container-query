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
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');


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
      .exists('We see the visualization.');

    assert.dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');


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


    await takeSnapshot(assert);
  });
});