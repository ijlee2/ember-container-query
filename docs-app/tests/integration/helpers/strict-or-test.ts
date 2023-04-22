import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Helper | strict-or', function (hooks) {
  setupRenderingTest(hooks);

  test('returns false when there are no conditionals', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-or) "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('false');
  });

  test('returns false when all conditionals are false', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-or false false false) "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('false');
  });

  test('returns false when all conditionals are falsey', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-or "" undefined) "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('false');
  });

  test('returns true when at least one conditional is true', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-or false false true) "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('true');
  });

  test('returns true when at least one conditional is truthy', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-or "" "some-instructions") "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('true');
  });
});
