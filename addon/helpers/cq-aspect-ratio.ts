import { helper } from '@ember/component/helper';

type Metadata = {
  dimension: 'aspectRatio' | 'height' | 'width';
  max: number;
  min: number;
};

function cqAspectRatio(
  positional: unknown[],
  named: Record<string, unknown>
): Metadata {
  const dimension = 'aspectRatio';
  const max = (named['max'] as number | undefined) ?? Infinity;
  const min = (named['min'] as number | undefined) ?? 0;

  return { dimension, max, min };
}

export default helper(cqAspectRatio);
