import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import musicRevenue from 'dummy/data/music-revenue';
import { createDataForVisualization } from 'dummy/utils/widgets/widget-2';

export default class WidgetsWidget2Component extends Component {
  @tracked data = [];

  constructor() {
    super(...arguments);

    this.loadData();
  }

  loadData() {
    this.data = createDataForVisualization(musicRevenue);
  }
}