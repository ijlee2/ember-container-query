import Component from '@glimmer/component';

import styles from './memo.css';

interface WidgetsWidget4MemoSignature {}

export default class WidgetsWidget4MemoComponent extends Component<WidgetsWidget4MemoSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4MemoComponent;
  }
}
