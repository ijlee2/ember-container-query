import { hash } from '@ember/helper';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { localClass } from 'embroider-css-modules';

import styles from './field.css';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [
      {
        inputId: string;
      }
    ];
    label: [
      {
        inputId: string;
      }
    ];
  };
}

export default class UiFormFieldComponent extends Component<UiFormFieldSignature> {
  styles = styles;

  inputId = guidFor(this);

  <template>
    <div
      class={{localClass
        this.styles
        "container"
        (if @isInline "is-inline")
        (if @isWide "is-wide")
        (unless @errorMessage "no-feedback")
      }}
    >
      <div class={{this.styles.label}}>
        {{yield (hash inputId=this.inputId) to="label"}}
      </div>

      <div class={{this.styles.field}}>
        {{yield (hash inputId=this.inputId) to="field"}}
      </div>

      {{#if @errorMessage}}
        <div
          class={{localClass this.styles "feedback" "is-error"}}
        >
          {{!-- @glint-expect-error: Unable to import the {{svg-jar}} helper --}}
          {{svg-jar
            "alert"
            desc="A warning to indicate that the input field has an error"
            role="img"
          }}

          <span
            data-test-feedback
            class={{this.styles.message}}
            role="alert"
          >
            {{@errorMessage}}
          </span>
        </div>
      {{/if}}
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Field': typeof UiFormFieldComponent;
  }
}
