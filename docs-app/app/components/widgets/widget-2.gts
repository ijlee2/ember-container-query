import { hash } from '@ember/helper';
import { ContainerQuery, height } from 'ember-container-query';

import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import { musicRevenues } from '../../data';
import type { Data, Summary } from '../../utils/components/widgets/widget-2';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from '../../utils/components/widgets/widget-2';
import styles from './widget-2.css';

interface WidgetsWidget2Signature {
  Args: {};
}

export default class WidgetsWidget2Component extends Component<WidgetsWidget2Signature> {
  @tracked data = [] as Data[];
  @tracked summaries = [] as Summary[];

  styles = styles;

  constructor(owner: Owner, args: WidgetsWidget2Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(musicRevenues);
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
  class={{this.styles.container}}
  as |CQ|
  >
  <header>
  <h2>Widget 2</h2>
  </header>

  {{#unless CQ.features.short}}
  <div class={{this.styles.visualization}}>
    <Widgets::Widget-2::StackedChart @data={{this.data}} />
  </div>
  {{/unless}}

  <div class={{this.styles.captions}}>
  <Widgets::Widget-2::Captions
    @summaries={{this.summaries}}
  />
  </div>
  </ContainerQuery>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2': typeof WidgetsWidget2Component;
  }
}
