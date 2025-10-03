import { hash } from '@ember/helper';
import UiForm from 'docs-app/components/ui/form';
import UiPage from 'docs-app/components/ui/page';
import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "Form"}}

  <UiPage @title="Form">
    <UiForm
      @data={{hash
        donation=undefined
        email=undefined
        message="I 🧡 container queries!"
        name=undefined
        subscribe=true
      }}
      @instructions="Still have questions about ember-container-query? Try sending me a message."
      @onSubmit={{@controller.submitForm}}
      @title="Contact me"
      as |F|
    >
      <div class={{@controller.styles.field}}>
        <F.Input
          @isRequired={{true}}
          @key="name"
          @label="Name"
          @placeholder="Zoey"
        />
      </div>

      <div class={{@controller.styles.field}}>
        <F.Input
          @isRequired={{true}}
          @key="email"
          @label="Email"
          @placeholder="zoey@emberjs.com"
          @type="email"
        />
      </div>

      <div class={{@controller.styles.field}}>
        <F.Textarea @key="message" @label="Message" />
      </div>

      <div class={{@controller.styles.field}}>
        <F.Checkbox @key="subscribe" @label="Subscribe to The Ember Times?" />
      </div>

      <div class={{@controller.styles.field}}>
        <F.Number
          @key="donation"
          @label="Donation amount ($)"
          @minValue={{0}}
          @placeholder="100"
          @step={{10}}
        />
      </div>
    </UiForm>
  </UiPage>
</template>
