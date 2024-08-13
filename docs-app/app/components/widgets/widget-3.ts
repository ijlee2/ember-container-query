import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { type Concert, concert } from '../../data';
import styles from './widget-3.css';

interface WidgetsWidget3Signature {
  Args: {};
}

export default class WidgetsWidget3Component extends Component<WidgetsWidget3Signature> {
  styles = styles;

  @tracked concert = {} as Concert;

  constructor(owner: unknown, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concert = concert;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3': typeof WidgetsWidget3Component;
  }
}
