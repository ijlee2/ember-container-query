import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class WidgetsWidget2CaptionsComponent extends Component {
  @tracked summary;
  @tracked currentIndex;

  get styleForMarker() {
    if (!this.summary) {
      return htmlSafe('');
    }

    return htmlSafe(`fill: ${this.summary.markerColor};`);
  }

  get summaries() {
    return this.args.summaries ?? [];
  }

  get canShowPreviousButton() {
    return this.currentIndex > 0;
  }

  get canShowNextButton() {
    return this.currentIndex < this.summaries.length - 1;
  }

  @action showSummary() {
    this.summary = this.summaries[0];
    this.currentIndex = 0;
  }

  @action showNextSummary(increment = 1) {
    const numSummaries = this.summaries.length;
    const nextIndex = (this.currentIndex + increment + numSummaries) % numSummaries;

    this.summary = this.summaries[nextIndex];
    this.currentIndex = nextIndex;
  }
}
