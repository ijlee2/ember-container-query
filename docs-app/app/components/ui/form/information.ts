import templateOnlyComponent from '@ember/component/template-only';

interface UiFormInformationSignature {
  Args: {
    formId: string;
    instructions?: string;
    title?: string;
  };
}

const UiFormInformationComponent =
  templateOnlyComponent<UiFormInformationSignature>();

export default UiFormInformationComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Information': typeof UiFormInformationComponent;
  }
}
