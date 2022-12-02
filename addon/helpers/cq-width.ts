import { helper } from '@ember/component/helper';
import type { Metadata } from 'ember-container-query/modifiers/container-query';

function cqWidth(
  positional: unknown[],
  named: Record<string, unknown>
): Metadata {
  const dimension = 'width';
  const max = (named['max'] as number | undefined) ?? Infinity;
  const min = (named['min'] as number | undefined) ?? 0;

  return { dimension, max, min };
}

export default helper(cqWidth);
