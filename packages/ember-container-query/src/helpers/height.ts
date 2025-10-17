import type { Metadata } from '../modifiers/container-query.ts';

type Named = {
  max?: number;
  min?: number;
};

export default function height(named?: Named): Metadata {
  const dimension = 'height';
  const max = named?.max ?? Infinity;
  const min = named?.min ?? 0;

  return { dimension, max, min };
}
