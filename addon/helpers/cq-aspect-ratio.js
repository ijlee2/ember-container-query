import { helper } from '@ember/component/helper';

function cqAspectRatio(params, hash) {
  const dimension = 'aspectRatio';
  const { min = 0, max = Infinity } = hash;

  return { dimension, min, max };
}

export default helper(cqAspectRatio);
