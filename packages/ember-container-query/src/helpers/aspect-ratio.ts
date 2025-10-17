import { helper } from '@ember/component/helper';

import type { Metadata } from '../modifiers/container-query.ts';

interface AspectRatioSignature {
  Args: {
    Named: {
      max?: number;
      min?: number;
    };
    Positional: [];
  };
  Return: Metadata;
}

const AspectRatio = helper<AspectRatioSignature>((_positional, named) => {
  const dimension = 'aspectRatio';
  const max = named.max ?? Infinity;
  const min = named.min ?? 0;

  return { dimension, max, min };
});

export default AspectRatio;
