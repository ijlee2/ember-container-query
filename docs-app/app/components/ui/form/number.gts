import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { generateErrorMessage } from 'docs-app/utils/components/ui/form';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import UiFormField from './field';
import styles from './number.module.css';

interface UiFormNumberSignature {
  Args: {
    data: Record<string, unknown>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    maxValue?: number;
    minValue?: number;
    onUpdate: ({ key, value }: { key: string; value: unknown }) => void;
    placeholder?: string;
    step?: number | 'any';
    type?: string;
  };
}

export default class UiFormNumber extends Component<UiFormNumberSignature> {
  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'number',
    });
  }

  get value(): string {
    const { data, key } = this.args;

    return ((get(data, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const isValid = (event.target as HTMLInputElement).checkValidity();

    if (!isValid) {
      onUpdate({ key, value: undefined });
      return;
    }

    const { value } = event.target as HTMLInputElement;
    const valueAsNumber = Number.parseFloat(value);

    onUpdate({ key, value: valueAsNumber });
  }

  <template>
    <UiFormField @errorMessage={{this.errorMessage}} @isWide={{@isWide}}>
      <:label as |l|>
        <label data-test-label for={{l.inputId}}>
          {{@label}}

          {{#if @isRequired}}
            <span aria-hidden="true">
              *
            </span>
          {{/if}}
        </label>
      </:label>

      <:field as |f|>
        <input
          class={{local
            styles
            "input"
            (if (or @isDisabled @isReadOnly) "is-disabled")
          }}
          data-test-field={{@label}}
          disabled={{@isDisabled}}
          id={{f.inputId}}
          max={{@maxValue}}
          min={{@minValue}}
          placeholder={{@placeholder}}
          readonly={{@isReadOnly}}
          required={{@isRequired}}
          step={{if @step @step "any"}}
          type="number"
          value={{this.value}}
          {{on "input" this.updateValue}}
        />
      </:field>
    </UiFormField>
  </template>
}
