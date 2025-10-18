import { fn, hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ContainerQuery, height, width } from 'ember-container-query';
import { modifier } from 'ember-modifier';
import svgJar from 'ember-svg-jar/helpers/svg-jar';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import type { Summary } from '../../../utils/components/widgets/widget-2';
import styles from './captions.module.css';

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
  @tracked currentIndex = 0;

  colorSvg = colorSvg;
  styles = styles;

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

  <template>
    <ContainerQuery
      @features={{hash large=(width min=320) tall=(height min=80)}}
      as |CQ|
    >
      <div
        class={{local this.styles "container" (unless CQ.features.tall "flat")}}
      >
        {{#if this.summary}}
          <div
            class={{local
              this.styles
              "summary"
              (if CQ.features.large "horizontal-layout")
            }}
            tabindex="0"
          >
            <h3
              class={{local
                this.styles
                "music-format"
                (unless CQ.features.large "small-font-size")
              }}
            >
              <span
                class={{this.styles.marker}}
                {{this.colorSvg this.summary.markerColor}}
              >
                {{svgJar
                  "stop"
                  desc="A square whose color matches that of a bar in the bar chart"
                  role="img"
                }}
              </span>

              <span data-test-field="Music Format">
                {{this.summary.musicFormat}}
              </span>
            </h3>

            <div
              class={{this.styles.annual-revenue}}
              data-test-field="Annual Revenue"
            >
              {{#if (or CQ.features.tall CQ.features.large)}}
                <span>Annual revenue:</span>
              {{/if}}

              <span class={{this.styles.highlight}}>
                {{this.summary.averageRevenue}}
              </span>
            </div>

            <div
              class={{this.styles.relevant-years}}
              data-test-field="Relevant Years"
            >
              {{#if (or CQ.features.tall CQ.features.large)}}
                <span>Relevant years:</span>
              {{/if}}

              <span class={{this.styles.highlight}}>
                {{this.summary.relevantYears.min}}
                -
                {{this.summary.relevantYears.max}}
              </span>
            </div>
          </div>

          {{#if this.canShowPreviousButton}}
            <button
              aria-label="Previous"
              class={{this.styles.previous-button}}
              data-test-button="Previous"
              type="button"
              {{on "click" (fn this.showNextSummary -1)}}
            >
              {{#if CQ.features.tall}}
                Previous

              {{else}}
                {{svgJar
                  "chevron-left"
                  class=(local this.styles "icon")
                  desc="A chevron arrow pointing left"
                  role="img"
                }}

              {{/if}}
            </button>
          {{/if}}

          {{#if this.canShowNextButton}}
            <button
              aria-label="Next"
              class={{this.styles.next-button}}
              data-test-button="Next"
              type="button"
              {{on "click" (fn this.showNextSummary 1)}}
            >
              {{#if CQ.features.tall}}
                Next

              {{else}}
                {{svgJar
                  "chevron-right"
                  class=(local this.styles "icon")
                  desc="A chevron arrow pointing right"
                  role="img"
                }}

              {{/if}}
            </button>
          {{/if}}
        {{/if}}
      </div>
    </ContainerQuery>
  </template>
}
