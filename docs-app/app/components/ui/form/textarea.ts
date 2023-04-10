import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import styles from './textarea.css';

interface UiFormTextareaSignature {
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
  };
}

export default class UiFormTextareaComponent extends Component<UiFormTextareaSignature> {
  styles = styles;

  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.value) {
      return 'Please provide a value.';
    }

    return undefined;
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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Form::Textarea': typeof UiFormTextareaComponent;
    'ui/form/textarea': typeof UiFormTextareaComponent;
  }
}
