import Component from '@glimmer/component';

import styles from './memo.css';

interface WidgetsWidget4MemoSignature {}

const WidgetsWidget4MemoComponent = class extends Component<WidgetsWidget4MemoSignature> {
  styles = styles;
};

export default WidgetsWidget4MemoComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4MemoComponent;
  }
}
