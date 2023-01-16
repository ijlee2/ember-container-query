import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { Concert } from '../../data/concert';
import concertData from '../../data/concert';

interface WidgetsWidget3ComponentSignature {}

export default class WidgetsWidget3Component extends Component<WidgetsWidget3ComponentSignature> {
  @tracked concertData = {} as Concert;

  /* @ts-expect-error Property 'Args' does not exist on type 'WidgetsWidget3ComponentSignature' */
  constructor(owner: unknown, args: WidgetsWidget3ComponentSignature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3': typeof WidgetsWidget3Component;
  }
}
