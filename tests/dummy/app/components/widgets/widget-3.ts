import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import concertData from 'dummy/data/concert';
import type { Concert } from 'dummy/data/concert';

interface WidgetsWidget3ComponentArgs {}

export default class WidgetsWidget3Component extends Component<WidgetsWidget3ComponentArgs> {
  @tracked concertData = {} as Concert;

  constructor(owner: unknown, args: WidgetsWidget3ComponentArgs) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
  }
}
