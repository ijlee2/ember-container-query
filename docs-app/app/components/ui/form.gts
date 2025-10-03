import { concat, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { WithBoundArgs } from '@glint/template';
import UiFormCheckbox from 'docs-app/components/ui/form/checkbox';
import UiFormInformation from 'docs-app/components/ui/form/information';
import UiFormInput from 'docs-app/components/ui/form/input';
import UiFormNumber from 'docs-app/components/ui/form/number';
import UiFormTextarea from 'docs-app/components/ui/form/textarea';
import { ContainerQuery, width } from 'ember-container-query';

import styles from './form.css';
import type UiFormCheckboxComponent from './form/checkbox';
import type UiFormInputComponent from './form/input';
import type UiFormNumberComponent from './form/number';
import type UiFormTextareaComponent from './form/textarea';

interface UiFormSignature {
  Args: {
    data?: Record<string, any>;
    instructions?: string;
    onSubmit: (data: Record<string, any>) => Promise<void>;
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
        Number: WithBoundArgs<
          typeof UiFormNumberComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextareaComponent,
          'changeset' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiFormComponent extends Component<UiFormSignature> {
  @tracked changeset = this.args.data ?? ({} as Record<string, any>);

  formId = guidFor(this);
  styles = styles;

  @action async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    await this.args.onSubmit(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }

  <template>
    <form
      aria-describedby={{if @instructions (concat this.formId "-instructions")}}
      aria-labelledby={{if @title (concat this.formId "-title")}}
      class={{this.styles.form}}
      data-test-form={{if @title @title ""}}
      {{on "submit" this.submitForm}}
    >
      <UiFormInformation
        @formId={{this.formId}}
        @instructions={{@instructions}}
        @title={{@title}}
      />

      <ContainerQuery @features={{hash wide=(width min=480)}} as |CQ|>
        {{yield
          (hash
            Checkbox=(component
              UiFormCheckbox
              changeset=this.changeset
              isInline=true
              isWide=CQ.features.wide
              onUpdate=this.updateChangeset
            )
            Input=(component
              UiFormInput
              changeset=this.changeset
              isWide=CQ.features.wide
              onUpdate=this.updateChangeset
            )
            Number=(component
              UiFormNumber
              changeset=this.changeset
              isWide=CQ.features.wide
              onUpdate=this.updateChangeset
            )
            Textarea=(component
              UiFormTextarea
              changeset=this.changeset
              isWide=CQ.features.wide
              onUpdate=this.updateChangeset
            )
          )
        }}
      </ContainerQuery>

      <div class={{this.styles.actions}}>
        <button
          class={{this.styles.submit-button}}
          data-test-button="Submit"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form': typeof UiFormComponent;
  }
}
