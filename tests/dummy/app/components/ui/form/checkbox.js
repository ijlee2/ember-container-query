import { action, get } from '@ember/object';
import Component from '@glimmer/component';

export default class UiFormCheckboxComponent extends Component {
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
    const { isDisabled, isReadOnly, key, onUpdate } = this.args;

    if (isDisabled || isReadOnly) {
      return;
    }

    const value = !this.isChecked;

    onUpdate({ key, value });
  }

  @action updateValueByPressingSpace(event) {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }
}
