import { helper } from '@ember/component/helper';

interface AddHelperSignature {
  Args: {
    Positional: number[];
  };
  Return: number;
}

const AddHelper = helper<AddHelperSignature>((positional) => {
  const sum = positional.reduce((accumulator, value) => accumulator + value, 0);

  return sum;
});

export default AddHelper;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    add: typeof AddHelper;
  }
}
