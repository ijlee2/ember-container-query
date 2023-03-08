import templateOnlyComponent from '@ember/component/template-only';

import type { Concert } from '../../../data/concert';

export interface WidgetsWidget3TourScheduleComponentSignature {
  Args: {
    concert: Concert;
  };
}

const WidgetsWidget3TourScheduleComponent =
  templateOnlyComponent<WidgetsWidget3TourScheduleComponentSignature>();

export default WidgetsWidget3TourScheduleComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule': typeof WidgetsWidget3TourScheduleComponent;
  }
}
