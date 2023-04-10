import Component from '@glimmer/component';

import styles from './body.css';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

export default class WidgetsWidget4MemoBodyComponent extends Component<WidgetsWidget4MemoBodySignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
