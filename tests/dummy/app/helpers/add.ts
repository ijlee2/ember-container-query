import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

function add(positional: Array<unknown>) {
  assert(
    'All positional arguments must be numbers.',
    positional.every((element) => typeof element === 'number')
  );

  const sum = (positional as Array<number>).reduce(
    (accumulator, value) => accumulator + value,
    0
  );

  return sum;
}

export default helper(add);
