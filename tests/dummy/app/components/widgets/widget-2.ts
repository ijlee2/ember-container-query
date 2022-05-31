import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import musicRevenue from 'dummy/data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from 'dummy/utils/components/widgets/widget-2';
import type { Data, Summary } from 'dummy/utils/components/widgets/widget-2';

interface WidgetsWidget2ComponentArgs {}

export default class WidgetsWidget2Component extends Component<WidgetsWidget2ComponentArgs> {
  @tracked data = [] as Array<Data>;
  @tracked summaries = [] as Array<Summary>;

  constructor(owner: unknown, args: WidgetsWidget2ComponentArgs) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(musicRevenue);
    this.summaries = createSummariesForCaptions(this.data);
  }
}
