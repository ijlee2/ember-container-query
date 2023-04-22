import type { TOC } from '@ember/component/template-only';

import styles from './page.css';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

const UiPageComponent: TOC<UiPageSignature> =
  <template>
    <div class={{styles.container}}>
      <h1 class={{styles.header}}>
        {{@title}}
      </h1>

      <div
        id="main-content"
        class={{styles.body}}
        tabindex="-1"
      >
        {{yield}}
      </div>
    </div>
  </template>

export default UiPageComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
  }
}
