import { helper } from '@ember/component/helper';

export function cqAspectRatio(params, hash) {
  const dimension = 'aspectRatio';
  const { min = 0, max = Infinity } = hash;

  return { dimension, min, max };
}

export default helper(cqAspectRatio);
