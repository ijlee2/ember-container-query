import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FormComponent extends Component {
  formId = guidFor(this);

  @tracked changeset = this.args.data ?? {};

  @action submitForm(event) {
    event.preventDefault();

    alert(JSON.stringify(this.changeset));
  }

  @action updateChangeset({ key, value }) {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }
}
