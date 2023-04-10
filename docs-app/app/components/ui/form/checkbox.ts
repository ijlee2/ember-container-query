import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import styles from './checkbox.css';

interface UiFormCheckboxSignature {
  Args: {
    changeset: Record<string, any>;
    isDisabled?: boolean;
    isInline?: boolean;
    isReadOnly?: boolean;
    isRequired?: boolean;
    isWide?: boolean;
    key: string;
    label: string;
    onUpdate: ({ key, value }: { key: string; value: any }) => void;
  };
}

export default class UiFormCheckboxComponent extends Component<UiFormCheckboxSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.isChecked) {
      return 'Please select the checkbox.';
    }

    return undefined;
  }

  get isChecked(): boolean {
    const { changeset, key } = this.args;

    return (get(changeset, key) as boolean) ?? false;
  }

  @action updateValue(): void {
    const { isDisabled, isReadOnly, key, onUpdate } = this.args;

    if (isDisabled || isReadOnly) {
      return;
    }

    const value = !this.isChecked;

    onUpdate({ key, value });
  }

  @action updateValueByPressingSpace(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Checkbox': typeof UiFormCheckboxComponent;
    'ui/form/checkbox': typeof UiFormCheckboxComponent;
  }
}
