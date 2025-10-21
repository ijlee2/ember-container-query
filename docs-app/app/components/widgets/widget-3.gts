import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { type Concert, concert } from 'docs-app/data/concert';

import styles from './widget-3.module.css';
import WidgetsWidget3TourSchedule from './widget-3/tour-schedule';

interface WidgetsWidget3Signature {
  Args: {};
}

export default class WidgetsWidget3 extends Component<WidgetsWidget3Signature> {
  @tracked concertData = {} as Concert;

  constructor(owner: Owner, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concert;
  }

  <template>
    <section class={{styles.container}}>
      <header class={{styles.header}}>
        <h2>Widget 3</h2>

        <div class={{styles.actions}}>
          <a data-test-link="All tours" href="#">
            All tours
          </a>
        </div>
      </header>

      <div class={{styles.tour-schedule}} data-test-tour-schedule>
        <WidgetsWidget3TourSchedule @concert={{this.concertData}} />
      </div>
    </section>
  </template>
}
