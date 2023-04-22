import type { TOC } from '@ember/component/template-only';

import styles from './item.css';

interface WidgetsWidget1ItemSignature {
  Args: {
    title: string;
  };
}

const WidgetsWidget1ItemComponent: TOC<WidgetsWidget1ItemSignature> =
  <template>
    <div class={{styles.container}}>
      <p data-test-title>
        {{@title}}
      </p>
    </div>
  </template>

export default WidgetsWidget1ItemComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1::Item': typeof WidgetsWidget1ItemComponent;
  }
}
