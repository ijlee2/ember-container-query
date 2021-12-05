import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class FormComponent extends Component {
  formId = guidFor(this);

  @action submitForm(event) {
    event.preventDefault();

    alert('Form has been submitted.');
  }
}
