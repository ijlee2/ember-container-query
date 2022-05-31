import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiFormFieldComponentArgs {
  errorMessage?: string;
  isInline?: boolean;
  isWide?: boolean;
}

export default class UiFormFieldComponent extends Component<UiFormFieldComponentArgs> {
  inputId = guidFor(this);
}
