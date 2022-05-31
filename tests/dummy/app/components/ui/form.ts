import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface UiFormComponentArgs {
  data?: {
    [key: string]: any;
  };
  instructions?: string;
  title?: string;
}

export default class UiFormComponent extends Component<UiFormComponentArgs> {
  formId = guidFor(this);

  @tracked changeset = this.args.data ?? {};

  @action submitForm(event: SubmitEvent): void {
    event.preventDefault();

    console.table(this.changeset);
  }

  @action updateChangeset({ key, value }: { key: string; value: any }): void {
    this.changeset = {
      ...this.changeset,
      [key]: value,
    };
  }
}
