import UiPage from 'docs-app/components/ui/page';

<template>
<UiPage @title="Welcome!">
  <p>
    Thanks for trying out
    <a
      class={{@controller.styles.code}}
      data-test-link="ember-container-query"
      href="https://github.com/ijlee2/ember-container-query"
      rel="noopener noreferrer"
      target="_blank"
    >
      ember-container-query
    </a>.
  </p>

  <p>
    To see what you can do with container queries, visit one of
    the examples and resize the window!
  </p>
</UiPage>
</template>
