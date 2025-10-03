import { on } from '@ember/modifier';
import UiFormField from 'docs-app/components/ui/form/field';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import { generateErrorMessage } from '../../../utils/components/ui/form';
import styles from './number.css';

interface UiFormNumberSignature {
  Args: {
    changeset: Record<string, any>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    maxValue?: number;
    minValue?: number;
    onUpdate: ({ key, value }: { key: string; value: any }) => void;
    placeholder?: string;
    step?: number | 'any';
    type?: string;
  };
}

export default class UiFormNumberComponent extends Component<UiFormNumberSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'number',
    });
  }

  get value(): string {
    const { changeset, key } = this.args;

    return ((get(changeset, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLInputElement;

    const valueAsNumber = Number.parseFloat(value);

    if (Number.isNaN(valueAsNumber)) {
      onUpdate({ key, value: undefined });
      return;
    }

    onUpdate({ key, value: valueAsNumber });
  }


  <template>
  <UiFormField
  @errorMessage={{this.errorMessage}}
  @isWide={{@isWide}}
  >
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
      this.styles
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Number': typeof UiFormNumberComponent;
    'ui/form/number': typeof UiFormNumberComponent;
  }
}
