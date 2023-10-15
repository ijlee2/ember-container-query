import { generateErrorMessage } from 'docs-app/utils/components/ui/form';
import { module, test } from 'qunit';

module('Unit | Utility | components/ui/form/index', function () {
  module('generateErrorMessage', function () {
    module('When isRequired is false', function () {
      test('When the value type is boolean', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: false,
          value: undefined,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: false,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: true,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });

      test('When the value type is number', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: false,
          value: undefined,
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: '',
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: '0',
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });

      test('When the value type is string', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: false,
          value: undefined,
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: '',
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          isRequired: false,
          value: 'Zoey',
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });
    });

    module('When isRequired is true', function () {
      test('When the value type is boolean', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: true,
          value: undefined,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          'Please select the checkbox.',
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: false,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          'Please select the checkbox.',
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: true,
          valueType: 'boolean',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });

      test('When the value type is number', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: true,
          value: undefined,
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: '',
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: '0',
          valueType: 'number',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });

      test('When the value type is string', function (assert) {
        let errorMessage = generateErrorMessage({
          isRequired: true,
          value: undefined,
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (1)',
        );

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: '',
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          'Please provide a value.',
          'We get the correct value. (2)',
        );

        errorMessage = generateErrorMessage({
          isRequired: true,
          value: 'Zoey',
          valueType: 'string',
        });

        assert.strictEqual(
          errorMessage,
          undefined,
          'We get the correct value. (3)',
        );
      });
    });
  });
});
