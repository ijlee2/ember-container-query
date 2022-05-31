import { action, get } from '@ember/object';
import Component from '@glimmer/component';

interface UiFormCheckboxComponentArgs {
  changeset: {
    [key: string]: any;
  };
  isDisabled?: boolean;
  isInline?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isWide?: boolean;
  key: string;
  label: string;
  onUpdate: ({ key, value }: { key: string; value: any }) => void;
}

export default class UiFormCheckboxComponent extends Component<UiFormCheckboxComponentArgs> {
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
