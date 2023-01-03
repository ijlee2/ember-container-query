import templateOnlyComponent from '@ember/component/template-only';

export interface EdgeCaseComponentSignature {
  Args: {
    aspectRatio?: number;
    height?: number;
    width?: number;
  };
}

const EdgeCaseComponent = templateOnlyComponent<EdgeCaseComponentSignature>();

export default EdgeCaseComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    EdgeCase: typeof EdgeCaseComponent;
  }
}
