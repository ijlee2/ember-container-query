import Component from '@glimmer/component';

import styles from './item.css';

interface WidgetsWidget1ItemSignature {
  Args: {
    title: string;
  };
}

const WidgetsWidget1ItemComponent =
  class extends Component<WidgetsWidget1ItemSignature> {
    styles = styles;
  };

export default WidgetsWidget1ItemComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1::Item': typeof WidgetsWidget1ItemComponent;
  }
}
