import Component from '@glimmer/component';

import styles from './widget-5.css';

interface WidgetsWidget5Signature {}

export default class WidgetsWidget5Component extends Component<WidgetsWidget5Signature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5Component;
  }
}
