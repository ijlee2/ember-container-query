import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { WithBoundArgs } from '@glint/template';
import type UiFormCheckboxComponent from 'dummy/components/ui/form/checkbox';
import type UiFormInputComponent from 'dummy/components/ui/form/input';
import type UiFormTextareaComponent from 'dummy/components/ui/form/textarea';

interface UiFormComponentSignature {
  Args: {
    data?: Record<string, any>;
    instructions?: string;
    title?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<
          typeof UiFormCheckboxComponent,
          'changeset' | 'isInline' | 'isWide' | 'onUpdate'
        >;
        Input: WithBoundArgs<
          typeof UiFormInputComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextareaComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
      }
    ];
  };
}

export default class UiFormComponent extends Component<UiFormComponentSignature> {
  formId = guidFor(this);

  @tracked changeset = this.args.data ?? ({} as Record<string, any>);

  @action submitForm(event: SubmitEvent): void {
    event.preventDefault();

    console.table(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiFormComponent;
  }
}
