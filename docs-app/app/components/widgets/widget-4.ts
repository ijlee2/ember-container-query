import Component from '@glimmer/component';

import styles from './widget-4.css';

interface WidgetsWidget4Signature {}

const WidgetsWidget4Component = class extends Component<WidgetsWidget4Signature> {
  styles = styles;
};

export default WidgetsWidget4Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4': typeof WidgetsWidget4Component;
  }
}
