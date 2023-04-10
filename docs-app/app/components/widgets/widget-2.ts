import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import musicRevenue from '../../data/music-revenue';
import type { Data, Summary } from '../../utils/components/widgets/widget-2';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from '../../utils/components/widgets/widget-2';
import styles from './widget-2.css';

interface WidgetsWidget2Signature {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args: {};
}

export default class WidgetsWidget2Component extends Component<WidgetsWidget2Signature> {
  styles = styles;

  @tracked data = [] as Data[];
  @tracked summaries = [] as Summary[];

  constructor(owner: unknown, args: WidgetsWidget2Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(musicRevenue);
    this.summaries = createSummariesForCaptions(this.data);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2': typeof WidgetsWidget2Component;
  }
}
