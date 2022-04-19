import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class UiFormFieldComponent extends Component {
  inputId = guidFor(this);
}
