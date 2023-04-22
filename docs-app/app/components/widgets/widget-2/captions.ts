import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import type { Summary } from '../../../utils/components/widgets/widget-2';
import styles from './captions.css';

const colorSvg = modifier((container: Element, [color]: [string]) => {
  const svgElement = container.querySelector('svg');

  if (!svgElement) {
    return;
  }

  svgElement.style.setProperty('color', color);
});

interface WidgetsWidget2CaptionsSignature {
  Args: {
    summaries?: Summary[];
  };
}

export default class WidgetsWidget2CaptionsComponent extends Component<WidgetsWidget2CaptionsSignature> {
  colorSvg = colorSvg;
  styles = styles;

  @tracked currentIndex = 0;

  get canShowNextButton(): boolean {
    return this.currentIndex < this.summaries.length - 1;
  }

  get canShowPreviousButton(): boolean {
    return this.currentIndex > 0;
  }

  get summaries(): Summary[] {
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::Captions': typeof WidgetsWidget2CaptionsComponent;
  }
}
