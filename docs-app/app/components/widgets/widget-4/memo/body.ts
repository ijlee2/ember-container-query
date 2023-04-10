import Component from '@glimmer/component';

import styles from './body.css';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoBodyComponent =
  class extends Component<WidgetsWidget4MemoBodySignature> {
    styles = styles;
  };

export default WidgetsWidget4MemoBodyComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
