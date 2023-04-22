import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';
import { localClass } from 'embroider-css-modules';

import strictOr from '../../../../helpers/strict-or';
import styles from './body.css';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

export default class WidgetsWidget4MemoBodyComponent extends Component<WidgetsWidget4MemoBodySignature> {
  styles = styles;

  <template>
    <div
      data-test-memo-body
      class={{localClass
        this.styles
        "body"
        (if
          (strictOr @cqFeatures.small @cqFeatures.short)
          "minimal-layout"
        )
      }}
    >
      <div class={{this.styles.message}} tabindex="0">
        <p>
          <strong>Buffon’s needle</strong>
          is a classic Monte Carlo simulation that we can conduct in
          a classroom.
        </p>
        <p>
          We give the students, say 10 needles each, and have them
          drop the needles on a paper that we provide also.
        </p>
        <p>
          The paper is special, in that it has parallel lines that
          are separated by the length of a needle.
        </p>
        <p>
          Each student records how many needles intersect one of the
          lines, then we tally their numbers to arrive at a very
          special number. (Guess
          <a
            href="https://crunchingnumbers.live/2016/02/01/monte-carlo-simulations-buffons-needle/"
            target="_blank"
            rel="noopener noreferrer"
          >
            who
          </a>?)
        </p>
      </div>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
