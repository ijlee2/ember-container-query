import Component from '@glimmer/component';

import styles from './widget-5.css';

interface WidgetsWidget5Signature {}

const WidgetsWidget5Component =
  class extends Component<WidgetsWidget5Signature> {
    styles = styles;
  };

export default WidgetsWidget5Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5Component;
  }
}
