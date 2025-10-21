import { concat, hash, uniqueId } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { WithBoundArgs } from '@glint/template';
import { ContainerQuery, width } from 'ember-container-query';

import styles from './form.module.css';
import UiFormCheckbox from './form/checkbox';
import UiFormInformation from './form/information';
import UiFormInput from './form/input';
import UiFormNumber from './form/number';
import UiFormTextarea from './form/textarea';

interface UiFormSignature {
  Args: {
    data?: Record<string, unknown>;
    instructions?: string;
    onSubmit: (data: Record<string, unknown>) => Promise<void>;
    title?: string;
  };
  Blocks: {
    default: [
      {
        Checkbox: WithBoundArgs<
          typeof UiFormCheckbox,
          'data' | 'isInline' | 'isWide' | 'onUpdate'
        >;
        Input: WithBoundArgs<
          typeof UiFormInput,
          'data' | 'isWide' | 'onUpdate'
        >;
        Number: WithBoundArgs<
          typeof UiFormNumber,
          'data' | 'isWide' | 'onUpdate'
        >;
        Textarea: WithBoundArgs<
          typeof UiFormTextarea,
          'data' | 'isWide' | 'onUpdate'
        >;
      },
    ];
  };
}

export default class UiForm extends Component<UiFormSignature> {
  @tracked data = this.args.data ?? ({} as Record<string, unknown>);

  @action async submitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    await this.args.onSubmit(this.data);
  }

  @action updateData({ key, value }: { key: string; value: unknown }): void {
    this.data = {
      ...this.data,
      [key]: value,
    };
  }

  <template>
    {{#let (uniqueId) as |formId|}}
      <form
        aria-describedby={{if @instructions (concat formId "-instructions")}}
        aria-labelledby={{if @title (concat formId "-title")}}
        class={{styles.form}}
        data-test-form={{if @title @title ""}}
        {{on "submit" this.submitForm}}
      >
        <UiFormInformation
          @formId={{formId}}
          @instructions={{@instructions}}
          @title={{@title}}
        />

        <ContainerQuery @features={{hash wide=(width min=480)}} as |CQ|>
          {{yield
            (hash
              Checkbox=(component
                UiFormCheckbox
                data=this.data
                isInline=true
                isWide=CQ.features.wide
                onUpdate=this.updateData
              )
              Input=(component
                UiFormInput
                data=this.data
                isWide=CQ.features.wide
                onUpdate=this.updateData
              )
              Number=(component
                UiFormNumber
                data=this.data
                isWide=CQ.features.wide
                onUpdate=this.updateData
              )
              Textarea=(component
                UiFormTextarea
                data=this.data
                isWide=CQ.features.wide
                onUpdate=this.updateData
              )
            )
          }}
        </ContainerQuery>

        <div class={{styles.actions}}>
          <button
            class={{styles.submit-button}}
            data-test-button="Submit"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    {{/let}}
  </template>
}
