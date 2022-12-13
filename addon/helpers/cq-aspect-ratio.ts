import { helper } from '@ember/component/helper';
import type { Metadata } from 'ember-container-query/modifiers/container-query';

interface CqAspectRatioHelperSignature {
  Args: {
    Named: {
      max?: number;
      min?: number;
    };
    Positional: [];
  };
  Return: Metadata;
}

const CqAspectRatioHelper = helper<CqAspectRatioHelperSignature>(
  (_positional, named) => {
    const dimension = 'aspectRatio';
    const max = named.max ?? Infinity;
    const min = named.min ?? 0;

    return { dimension, max, min };
  }
);

export default CqAspectRatioHelper;
