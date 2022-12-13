import { helper } from '@ember/component/helper';
import type { Metadata } from 'ember-container-query/modifiers/container-query';

interface CqHeightHelperSignature {
  Args: {
    Named: {
      max?: number;
      min?: number;
    };
    Positional: [];
  };
  Return: Metadata;
}

const CqHeightHelper = helper<CqHeightHelperSignature>((_positional, named) => {
  const dimension = 'height';
  const max = named.max ?? Infinity;
  const min = named.min ?? 0;

  return { dimension, max, min };
});

export default CqHeightHelper;
