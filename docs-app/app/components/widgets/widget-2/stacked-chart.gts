import type { TOC } from '@ember/component/template-only';
import drawStackedChart from 'docs-app/modifiers/draw-stacked-chart';
import type { Data } from 'docs-app/utils/components/widgets/widget-2';

import styles from './stacked-chart.module.css';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

const WidgetsWidget2StackedChart: TOC<WidgetsWidget2StackedChartSignature> =
  <template>
    <div class={{styles.svg-container}} {{drawStackedChart data=@data}}>
      <svg class={{styles.svg}}>
      </svg>
    </div>
  </template>;

export default WidgetsWidget2StackedChart;
