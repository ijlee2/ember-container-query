import { hash } from '@ember/helper';
import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { revenues } from 'docs-app/data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
  type Data,
  type Summary,
} from 'docs-app/utils/components/widgets/widget-2';
import { ContainerQuery, height } from 'ember-container-query';

import styles from './widget-2.module.css';
import WidgetsWidget2Captions from './widget-2/captions';
import WidgetsWidget2StackedChart from './widget-2/stacked-chart';

interface WidgetsWidget2Signature {
  Args: {};
}

export default class WidgetsWidget2 extends Component<WidgetsWidget2Signature> {
  @tracked data = [] as Data[];
  @tracked summaries = [] as Summary[];

  constructor(owner: Owner, args: WidgetsWidget2Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(revenues);
    this.summaries = createSummariesForCaptions(this.data);
  }

  <template>
    <ContainerQuery
      @features={{hash
        short=(height max=240)
        tall=(height max=480 min=240)
        very-tall=(height min=480)
      }}
      @tagName="section"
      class={{styles.container}}
      as |CQ|
    >
      <header>
        <h2>Widget 2</h2>
      </header>

      {{#unless CQ.features.short}}
        <div class={{styles.visualization}} data-test-visualization>
          <WidgetsWidget2StackedChart @data={{this.data}} />
        </div>
      {{/unless}}

      <div class={{styles.captions}} data-test-captions>
        <WidgetsWidget2Captions @summaries={{this.summaries}} />
      </div>
    </ContainerQuery>
  </template>
}
