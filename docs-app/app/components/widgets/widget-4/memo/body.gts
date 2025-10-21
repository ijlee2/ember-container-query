import type { TOC } from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import styles from './body.module.css';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoBodyComponent: TOC<WidgetsWidget4MemoBodySignature> =
  <template>
    <div
      class={{local
        styles
        "body"
        (if (or @cqFeatures.small @cqFeatures.short) "minimal-layout")
      }}
      data-test-memo-body
    >
      <div class={{styles.message}} tabindex="0">
        <p>
          <strong>Buffon’s needle</strong>
          is a classic Monte Carlo simulation that we can conduct in a
          classroom.
        </p>
        <p>
          We give the students, say 10 needles each, and have them drop the
          needles on a paper that we provide also.
        </p>
        <p>
          The paper is special, in that it has parallel lines that are separated
          by the length of a needle.
        </p>
        <p>
          Each student records how many needles intersect one of the lines, then
          we tally their numbers to arrive at a very special number. (Guess
          <a
            href="https://crunchingnumbers.live/2016/02/01/monte-carlo-simulations-buffons-needle/"
            rel="noopener noreferrer"
            target="_blank"
          >
            who
          </a>?)
        </p>
      </div>
    </div>
  </template>;

export default WidgetsWidget4MemoBodyComponent;
