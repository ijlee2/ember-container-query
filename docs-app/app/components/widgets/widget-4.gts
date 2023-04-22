import Component from '@glimmer/component';

import styles from './widget-4.css';
import WidgetsWidget4Memo from './widget-4/memo';

interface WidgetsWidget4Signature {}

export default class WidgetsWidget4Component extends Component<WidgetsWidget4Signature> {
  styles = styles;

  <template>
    <section class={{this.styles.container}}>
      <header class={{this.styles.header}}>
        <h2>Widget 4</h2>
      </header>

      <div class={{this.styles.memo-highlight}}>
        <WidgetsWidget4Memo />
      </div>

      <div class={{this.styles.actions}}>
        <a data-test-link="All memos" href="#">
          All memos
        </a>
      </div>
    </section>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4': typeof WidgetsWidget4Component;
  }
}
