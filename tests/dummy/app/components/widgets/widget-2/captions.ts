import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import type { SafeString } from '@ember/template/-private/handlebars';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Summary } from 'dummy/utils/components/widgets/widget-2';

interface WidgetsWidget2CaptionsComponentArgs {
  summaries?: Array<Summary>;
}

export default class WidgetsWidget2CaptionsComponent extends Component<WidgetsWidget2CaptionsComponentArgs> {
  @tracked summary?: Summary;
  @tracked currentIndex = 0;

  get styleForMarker(): SafeString {
    if (!this.summary) {
      return htmlSafe('');
    }

    return htmlSafe(`color: ${this.summary.markerColor};`);
  }

  get summaries(): Array<Summary> {
    return this.args.summaries ?? [];
  }

  get canShowPreviousButton(): boolean {
    return this.currentIndex > 0;
  }

  get canShowNextButton(): boolean {
    return this.currentIndex < this.summaries.length - 1;
  }

  @action showSummary(): void {
    this.summary = this.summaries[0];
    this.currentIndex = 0;
  }

  @action showNextSummary(increment = 1): void {
    const numSummaries = this.summaries.length;
    const nextIndex =
      (this.currentIndex + increment + numSummaries) % numSummaries;

    this.summary = this.summaries[nextIndex];
    this.currentIndex = nextIndex;
  }
}
