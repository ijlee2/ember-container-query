import { helper } from '@ember/component/helper';

import type { Metadata } from '../modifiers/container-query.ts';

interface HeightSignature {
  Args: {
    Named: {
      max?: number;
      min?: number;
    };
    Positional: [];
  };
  Return: Metadata;
}

const Height = helper<HeightSignature>((_positional, named) => {
  const dimension = 'height';
  const max = named.max ?? Infinity;
  const min = named.min ?? 0;

  return { dimension, max, min };
});

export default Height;
