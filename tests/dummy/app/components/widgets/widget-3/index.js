import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import concertData from 'dummy/data/concert';

export default class WidgetsWidget3Component extends Component {
  @tracked concertData = {};

  constructor() {
    super(...arguments);

    this.loadData();
  }

  loadData() {
    this.concertData = concertData;
  }
}
