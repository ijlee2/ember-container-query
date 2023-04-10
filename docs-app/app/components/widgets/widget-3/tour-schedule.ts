import Component from '@glimmer/component';

import type { Concert } from '../../../data/concert';
import styles from './tour-schedule.css';

interface WidgetsWidget3TourScheduleSignature {
  Args: {
    concert: Concert;
  };
}

export default class WidgetsWidget3TourScheduleComponent extends Component<WidgetsWidget3TourScheduleSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule': typeof WidgetsWidget3TourScheduleComponent;
  }
}
