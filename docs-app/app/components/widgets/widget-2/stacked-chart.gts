import Component from '@glimmer/component';

import drawStackedChart from '../../../modifiers/draw-stacked-chart';
import type { Data } from '../../../utils/components/widgets/widget-2';
import styles from './stacked-chart.css';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

export default class WidgetsWidget2StackedChartComponent extends Component<WidgetsWidget2StackedChartSignature> {
  styles = styles;

  <template>
    <div
      class={{this.styles.svg-container}}
      {{! @glint-expect-error: The given value does not appear to be usable as a component, modifier or helper. }}
      {{drawStackedChart data=@data}}
    >
      <svg class={{this.styles.svg}}>
      </svg>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
  }
}
