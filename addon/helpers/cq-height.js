import { helper } from '@ember/component/helper';

function cqHeight(params, hash) {
  const dimension = 'height';
  const { min = 0, max = Infinity } = hash;

  return { dimension, min, max };
}

export default helper(cqHeight);
