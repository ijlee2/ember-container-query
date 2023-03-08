import templateOnlyComponent from '@ember/component/template-only';

import type { Data } from '../../../utils/components/widgets/widget-2';

interface WidgetsWidget2StackedChartComponentSignature {
  Args: {
    data: Array<Data>;
  };
}

const WidgetsWidget2StackedChartComponent =
  templateOnlyComponent<WidgetsWidget2StackedChartComponentSignature>();

export default WidgetsWidget2StackedChartComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
  }
}
