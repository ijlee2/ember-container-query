import type { TOC } from '@ember/component/template-only';
import { hash, uniqueId } from '@ember/helper';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Could not find a declaration file for module 'ember-svg-jar/helpers/svg-jar'.
import svgJar from 'ember-svg-jar/helpers/svg-jar';
import { local } from 'embroider-css-modules';

import styles from './field.module.css';

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
      },
    ];
    label: [
      {
        inputId: string;
      },
    ];
  };
}

const UiFormField: TOC<UiFormFieldSignature> = <template>
  {{#let (uniqueId) as |inputId|}}
    <div
      class={{local
        styles
        "container"
        (if @isInline "is-inline")
        (if @isWide "is-wide")
        (unless @errorMessage "no-feedback")
      }}
      data-test-field-container
    >
      <div class={{styles.label}}>
        {{yield (hash inputId=inputId) to="label"}}
      </div>

      <div class={{styles.field}}>
        {{yield (hash inputId=inputId) to="field"}}
      </div>

      {{#if @errorMessage}}
        <div class={{local styles "feedback" "is-error"}}>
          {{svgJar
            "alert"
            desc="A warning to indicate that the input field has an error"
            role="img"
          }}

          <span class={{styles.message}} data-test-error-message role="alert">
            {{@errorMessage}}
          </span>
        </div>
      {{/if}}
    </div>
  {{/let}}
</template>;

export default UiFormField;
