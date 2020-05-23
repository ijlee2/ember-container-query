import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class WidgetsWidget2Component extends Component {
  @tracked data = [];

  constructor() {
    super(...arguments);

    this.loadData();
  }

  loadData() {
  }
}