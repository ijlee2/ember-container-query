import Component from '@glimmer/component';

import type { Data } from '../../../utils/components/widgets/widget-2';
import styles from './stacked-chart.css';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

export default class WidgetsWidget2StackedChartComponent extends Component<WidgetsWidget2StackedChartSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
  }
}
