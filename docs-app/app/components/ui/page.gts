import Component from '@glimmer/component';

import styles from './page.css';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
}

export default class UiPageComponent extends Component<UiPageSignature> {
  styles = styles;

  <template>
    <div class={{this.styles.container}}>
      <h1 class={{this.styles.header}}>
        {{@title}}
      </h1>

      <div
        id="main-content"
        class={{this.styles.body}}
        tabindex="-1"
      >
        {{yield}}
      </div>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
  }
}
