import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';
import { localClass } from 'embroider-css-modules';

import strictOr from '../../../../helpers/strict-or';
import styles from './actions.css';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

export default class WidgetsWidget4MemoActionsComponent extends Component<WidgetsWidget4MemoActionsSignature> {
  styles = styles;

  <template>
    <div
      data-test-memo-actions
      class={{localClass
        this.styles
        "actions"
        (if
          (strictOr @cqFeatures.small @cqFeatures.short)
          "minimal-layout"
        )
      }}
    >
      <button
        aria-label="Comment"
        class={{this.styles.button}}
        type="button"
      >
        {{!-- @glint-expect-error: Unable to import the {{svg-jar}} helper --}}
        {{svg-jar
          "message-processing-outline"
          class=(localClass this.styles "icon" "icon-comment")
          desc="A speech bubble"
          role="img"
        }}
      </button>

      <button
        aria-label="Repost"
        class={{this.styles.button}}
        type="button"
      >
        {{!-- @glint-expect-error: Unable to import the {{svg-jar}} helper --}}
        {{svg-jar
          "sync"
          class=(localClass this.styles "icon" "icon-repost")
          desc="Two circular arrows pointing to each other"
          role="img"
        }}
      </button>

      <button
        aria-label="Like"
        class={{this.styles.button}}
        type="button"
      >
        {{!-- @glint-expect-error: Unable to import the {{svg-jar}} helper --}}
        {{svg-jar
          "heart-outline"
          class=this.styles.icon
          desc="A heart"
          role="img"
        }}
      </button>

      <button
        aria-label="Share"
        class={{this.styles.button}}
        type="button"
      >
        {{!-- @glint-expect-error: Unable to import the {{svg-jar}} helper --}}
        {{svg-jar
          "share-variant-outline"
          class=this.styles.icon
          desc="A circular node that branches out to two circular nodes"
          role="img"
        }}
      </button>
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Actions': typeof WidgetsWidget4MemoActionsComponent;
  }
}
