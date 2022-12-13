import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

interface AddHelperSignature {
  Args: {
    Positional: Array<unknown>;
  };
  Return: number;
}

const AddHelper = helper<AddHelperSignature>((positional) => {
  assert(
    'All positional arguments must be numbers.',
    positional.every((element) => typeof element === 'number')
  );

  const sum = (positional as Array<number>).reduce(
    (accumulator, value) => accumulator + value,
    0
  );

  return sum;
});

export default AddHelper;
