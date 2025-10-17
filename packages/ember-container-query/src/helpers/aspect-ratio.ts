import type { Metadata } from '../modifiers/container-query.ts';

type Named = {
  max?: number;
  min?: number;
};

export default function aspectRatio(named?: Named): Metadata {
  const dimension = 'aspectRatio';
  const max = named?.max ?? Infinity;
  const min = named?.min ?? 0;

  return { dimension, max, min };
}
