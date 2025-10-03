import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { type Concert, concert } from '../../data';
import styles from './widget-3.css';
import WidgetsWidget3TourSchedule from './widget-3/tour-schedule';

interface WidgetsWidget3Signature {
  Args: {};
}

export default class WidgetsWidget3Component extends Component<WidgetsWidget3Signature> {
  @tracked concert = {} as Concert;

  styles = styles;

  constructor(owner: Owner, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concert = concert;
  }

  <template>
    <section class={{this.styles.container}}>
      <header class={{this.styles.header}}>
        <h2>Widget 3</h2>

        <div class={{this.styles.actions}}>
          <a data-test-link="All tours" href="#">
            All tours
          </a>
        </div>
      </header>

      <div class={{this.styles.tour-schedule}} data-test-tour-schedule>
        <WidgetsWidget3TourSchedule @concert={{this.concert}} />
      </div>
    </section>
  </template>
}
