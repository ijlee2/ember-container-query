import { helper } from '@ember/component/helper';

import type { Metadata } from '../modifiers/container-query';

interface WidthHelperSignature {
  Args: {
    Named: {
      max?: number;
      min?: number;
    };
    Positional: [];
  };
  Return: Metadata;
}

const WidthHelper = helper<WidthHelperSignature>((_positional, named) => {
  const dimension = 'width';
  const max = named.max ?? Infinity;
  const min = named.min ?? 0;

  return { dimension, max, min };
});

export default WidthHelper;
