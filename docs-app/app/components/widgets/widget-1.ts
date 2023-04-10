import Component from '@glimmer/component';

import styles from './widget-1.css';

interface WidgetsWidget1Signature {}

export default class WidgetsWidget1Component extends Component<WidgetsWidget1Signature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1': typeof WidgetsWidget1Component;
  }
}
