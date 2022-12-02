import { helper } from '@ember/component/helper';
import type { Metadata } from 'ember-container-query/modifiers/container-query';

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
