import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Helper | strict-and', function (hooks) {
  setupRenderingTest(hooks);

  test('returns true when there are no conditionals', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-and) "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('true');
  });

  test('returns true when all conditionals are true', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-and true true true) "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('true');
  });

  test('returns true when all conditionals are truthy', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-and "some-title" "some-instructions") "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('true');
  });

  test('returns false when at least 1 conditional is false', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-and true true false) "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('false');
  });

  test('returns false when at least 1 conditional is falsey', async function (assert) {
    await render(hbs`
      <p data-test-value>
        {{if (strict-and "some-title" "") "true" "false"}}
      </p>
    `);

    assert.dom('[data-test-value]').hasText('false');
  });
});
