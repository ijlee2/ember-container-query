import { action, get } from '@ember/object';
import Component from '@glimmer/component';

export default class UiFormTextareaComponent extends Component {
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

  get value() {
    const { changeset, key } = this.args;

    return (get(changeset, key) ?? '').toString();
  }

  @action updateValue(event) {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    onUpdate({ key, value });
  }
}
