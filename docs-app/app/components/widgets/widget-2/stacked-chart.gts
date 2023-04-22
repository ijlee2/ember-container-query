import type { TOC } from '@ember/component/template-only';

import drawStackedChart from '../../../modifiers/draw-stacked-chart';
import type { Data } from '../../../utils/components/widgets/widget-2';
import styles from './stacked-chart.css';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

const WidgetsWidget2StackedChartComponent: TOC<WidgetsWidget2StackedChartSignature> =
  <template>
    <div
      class={{styles.svg-container}}
      {{! @glint-expect-error: The given value does not appear to be usable as a component, modifier or helper. }}
      {{drawStackedChart data=@data}}
    >
      <svg class={{styles.svg}}>
      </svg>
    </div>
  </template>

export default WidgetsWidget2StackedChartComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
  }
}
