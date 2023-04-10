import Component from '@glimmer/component';

import styles from './widget-1.css';

interface WidgetsWidget1Signature {}

const WidgetsWidget1Component = class extends Component<WidgetsWidget1Signature> {
  styles = styles;
};

export default WidgetsWidget1Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1': typeof WidgetsWidget1Component;
  }
}
