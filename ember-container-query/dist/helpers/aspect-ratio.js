import { helper } from '@ember/component/helper';

const AspectRatioHelper = helper((_positional, named) => {
  const dimension = 'aspectRatio';
  const max = named.max ?? Infinity;
  const min = named.min ?? 0;
  return {
    dimension,
    max,
    min
  };
});

export { AspectRatioHelper as default };
//# sourceMappingURL=aspect-ratio.js.map
