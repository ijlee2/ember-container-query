import { action, get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class UiFormCheckboxComponent extends Component {
  inputId = guidFor(this);

  get errorMessage() {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.isChecked) {
      return 'Please select the checkbox.';
    }

    return undefined;
  }

  get isChecked() {
    const { changeset, key } = this.args;

    return get(changeset, key) ?? undefined;
  }

  @action updateValue() {
    if (this.args.isDisabled) {
      return;
    }

    const { key, onUpdate } = this.args;
    const value = !this.isChecked;

    onUpdate({ key, value });
  }

  @action updateValueByPressingSpace(event) {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }
}
