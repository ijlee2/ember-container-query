import type { TOC } from '@ember/component/template-only';

import styles from './widget-4.css';
import WidgetsWidget4Memo from './widget-4/memo';

interface WidgetsWidget4Signature {}

const WidgetsWidget4Component: TOC<WidgetsWidget4Signature> =
  <template>
    <section class={{styles.container}}>
      <header class={{styles.header}}>
        <h2>Widget 4</h2>
      </header>

      <div class={{styles.memo-highlight}}>
        <WidgetsWidget4Memo />
      </div>

      <div class={{styles.actions}}>
        <a data-test-link="All memos" href="#">
          All memos
        </a>
      </div>
    </section>
  </template>

export default WidgetsWidget4Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4': typeof WidgetsWidget4Component;
  }
}
