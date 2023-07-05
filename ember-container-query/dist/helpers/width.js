import { helper } from '@ember/component/helper';

const WidthHelper = helper((_positional, named) => {
  const dimension = 'width';
  const max = named.max ?? Infinity;
  const min = named.min ?? 0;
  return {
    dimension,
    max,
    min
  };
});

export { WidthHelper as default };
//# sourceMappingURL=width.js.map
