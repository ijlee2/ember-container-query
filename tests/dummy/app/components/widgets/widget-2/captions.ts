import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Summary } from 'dummy/utils/components/widgets/widget-2';

interface WidgetsWidget2CaptionsComponentArgs {
  summaries?: Array<Summary>;
}

export default class WidgetsWidget2CaptionsComponent extends Component<WidgetsWidget2CaptionsComponentArgs> {
  @tracked currentIndex = 0;

  get canShowNextButton(): boolean {
    return this.currentIndex < this.summaries.length - 1;
  }

  get canShowPreviousButton(): boolean {
    return this.currentIndex > 0;
  }

  get summaries(): Array<Summary> {
    return this.args.summaries ?? [];
  }

  get summary(): Summary | undefined {
    return this.summaries[this.currentIndex];
  }

  @action showNextSummary(increment = 1): void {
    const { currentIndex, summaries } = this;

    const numSummaries = summaries.length;
    const nextIndex = (currentIndex + increment + numSummaries) % numSummaries;

    this.currentIndex = nextIndex;
  }
}
