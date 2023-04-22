import { helper } from '@ember/component/helper';

type MaybeConditional = boolean | string | undefined;

interface StrictAndSignature {
  Args: {
    Positional: MaybeConditional[];
  };
  Return: boolean;
}

const StrictAndHelper = helper<StrictAndSignature>((conditionals) => {
  return conditionals.every(Boolean);
});

export default StrictAndHelper;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'strict-and': typeof StrictAndHelper;
  }
}
