import { action, get } from '@ember/object';
import Component from '@glimmer/component';

interface UiFormTextareaComponentArgs {
  changeset: {
    [key: string]: any;
  };
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isWide?: boolean;
  key: string;
  label: string;
  onUpdate: ({ key, value }: { key: string; value: any }) => void;
  placeholder?: string;
}

export default class UiFormTextareaComponent extends Component<UiFormTextareaComponentArgs> {
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

  @action updateValue(event: InputEvent & { target: HTMLInputElement }): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    onUpdate({ key, value });
  }
}
