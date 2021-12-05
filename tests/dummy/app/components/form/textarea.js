import { action, get } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { createCache, getValue } from '@glimmer/tracking/primitives/cache';

export default class FormTextareaComponent extends Component {
  inputId = guidFor(this);

  get errorMessage() {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.value) {
      return 'Please provide a value.';
    }

    return undefined;
  }

  #value = createCache(() => {
    const { changeset, key } = this.args;

    return (get(changeset, key) ?? '').toString();
  });

  get value() {
    return getValue(this.#value);
  }

  @action updateValue(event) {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    onUpdate({ key, value });
  }
}
