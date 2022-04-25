import { helper } from '@ember/component/helper';

function cqWidth(params, hash) {
  const dimension = 'width';
  const { min = 0, max = Infinity } = hash;

  return { dimension, min, max };
}

export default helper(cqWidth);
