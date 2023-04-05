import templateOnlyComponent from '@ember/component/template-only';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const UiPageComponent = templateOnlyComponent<UiPageSignature>();

export default UiPageComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
  }
}
