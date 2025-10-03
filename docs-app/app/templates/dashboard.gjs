import UiPage from 'docs-app/components/ui/page';
import { pageTitle } from 'ember-page-title';

<template>
{{pageTitle "Dashboard"}}

<UiPage @title="Dashboard">
  <div class={{@controller.styles.widgets}}>
    <div class={{@controller.styles.widget-1}} data-test-widget="1">
      <Widgets::Widget-1 />
    </div>

    <div class={{@controller.styles.widget-2}} data-test-widget="2">
      <Widgets::Widget-2 />
    </div>

    <div class={{@controller.styles.widget-3}} data-test-widget="3">
      <Widgets::Widget-3 />
    </div>

    <div class={{@controller.styles.widget-4}} data-test-widget="4">
      <Widgets::Widget-4 />
    </div>

    <div class={{@controller.styles.widget-5}} data-test-widget="5">
      <Widgets::Widget-5 />
    </div>
  </div>
</UiPage>
</template>
