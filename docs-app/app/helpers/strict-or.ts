import { helper } from '@ember/component/helper';

type MaybeConditional = boolean | string | undefined;

interface StrictOrSignature {
  Args: {
    Positional: MaybeConditional[];
  };
  Return: boolean;
}

const StrictOrHelper = helper<StrictOrSignature>((conditionals) => {
  return conditionals.some(Boolean);
});

export default StrictOrHelper;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'strict-or': typeof StrictOrHelper;
  }
}
