type Options = {
  isRequired?: boolean;
  value: unknown;
  valueType: 'boolean' | 'number' | 'string';
};

export function generateErrorMessage({
  isRequired,
  value,
  valueType,
}: Options): string | undefined {
  if (isRequired) {
    switch (valueType) {
      case 'boolean': {
        if (value === undefined || value === false) {
          return 'Please select the checkbox.';
        }

        break;
      }

      case 'number':
      case 'string': {
        if (value === undefined || value === '') {
          return 'Please provide a value.';
        }

        break;
      }
    }
  }

  return undefined;
}
