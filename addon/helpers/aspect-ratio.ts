import { helper } from '@ember/component/helper';

import type { Metadata } from '../modifiers/container-query';

interface AspectRatioHelperSignature {
  Args: {
    Named: {
      max?: number;
      min?: number;
    };
    Positional: [];
  };
  Return: Metadata;
}

const AspectRatioHelper = helper<AspectRatioHelperSignature>(
  (_positional, named) => {
    const dimension = 'aspectRatio';
    const max = named.max ?? Infinity;
    const min = named.min ?? 0;

    return { dimension, max, min };
  }
);

export default AspectRatioHelper;
