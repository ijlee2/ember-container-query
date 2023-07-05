import { helper } from '@ember/component/helper';

const HeightHelper = helper((_positional, named) => {
  const dimension = 'height';
  const max = named.max ?? Infinity;
  const min = named.min ?? 0;
  return {
    dimension,
    max,
    min
  };
});

export { HeightHelper as default };
//# sourceMappingURL=height.js.map
