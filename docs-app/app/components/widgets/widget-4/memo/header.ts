import Component from '@glimmer/component';

import styles from './header.css';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

export default class WidgetsWidget4MemoHeaderComponent extends Component<WidgetsWidget4MemoHeaderSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
