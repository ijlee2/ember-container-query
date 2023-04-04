import templateOnlyComponent from '@ember/component/template-only';

interface UiPageComponentSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const UiPageComponent = templateOnlyComponent<UiPageComponentSignature>();

export default UiPageComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
  }
}
