import { action, get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { createCache, getValue } from '@glimmer/tracking/primitives/cache';

export default class FormCheckboxComponent extends Component {
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

  #isChecked = createCache(() => {
    const { changeset, key } = this.args;

    return get(changeset, key) ?? undefined;
  });

  get isChecked() {
    return getValue(this.#isChecked);
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
