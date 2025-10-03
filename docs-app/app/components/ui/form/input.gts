import { on } from '@ember/modifier';
import UiFormField from 'docs-app/components/ui/form/field';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import { assert } from '@ember/debug';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import { generateErrorMessage } from '../../../utils/components/ui/form';
import styles from './input.css';

interface UiFormInputSignature {
  Args: {
    changeset: Record<string, any>;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: any }) => void;
    placeholder?: string;
    type?: string;
  };
}

export default class UiFormInputComponent extends Component<UiFormInputSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get type(): string {
    const { type } = this.args;

    assert(
      'To render a number input, please use <Ui::Form::Number> instead.',
      type !== 'number',
    );

    return this.args.type ?? 'text';
  }

  get value(): string {
    const { changeset, key } = this.args;

    return ((get(changeset, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLInputElement;

    onUpdate({ key, value });
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
    placeholder={{@placeholder}}
    readonly={{@isReadOnly}}
    required={{@isRequired}}
    type={{this.type}}
    value={{this.value}}
    {{on "input" this.updateValue}}
  />
  </:field>
  </UiFormField>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Input': typeof UiFormInputComponent;
    'ui/form/input': typeof UiFormInputComponent;
  }
}
