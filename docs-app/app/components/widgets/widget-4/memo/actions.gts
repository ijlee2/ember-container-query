import type { TOC } from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Could not find a declaration file for module 'ember-svg-jar/helpers/svg-jar'.
import svgJar from 'ember-svg-jar/helpers/svg-jar';
import { localClass } from 'embroider-css-modules';

import strictOr from '../../../../helpers/strict-or';
import styles from './actions.css';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoActionsComponent: TOC<WidgetsWidget4MemoActionsSignature> =
  <template>
    <div
      class={{localClass
        styles
        "actions"
        (if
          (strictOr @cqFeatures.small @cqFeatures.short)
          "minimal-layout"
        )
      }}
      data-test-memo-actions
    >
      <button
        aria-label="Comment"
        class={{styles.button}}
        type="button"
      >
        {{svgJar
          "message-processing-outline"
          class=(localClass styles "icon" "icon-comment")
          desc="A speech bubble"
          role="img"
        }}
      </button>

      <button
        aria-label="Repost"
        class={{styles.button}}
        type="button"
      >
        {{svgJar
          "sync"
          class=(localClass styles "icon" "icon-repost")
          desc="Two circular arrows pointing to each other"
          role="img"
        }}
      </button>

      <button
        aria-label="Like"
        class={{styles.button}}
        type="button"
      >
        {{svgJar
          "heart-outline"
          class=styles.icon
          desc="A heart"
          role="img"
        }}
      </button>

      <button
        aria-label="Share"
        class={{styles.button}}
        type="button"
      >
        {{svgJar
          "share-variant-outline"
          class=styles.icon
          desc="A circular node that branches out to two circular nodes"
          role="img"
        }}
      </button>
    </div>
  </template>

export default WidgetsWidget4MemoActionsComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Actions': typeof WidgetsWidget4MemoActionsComponent;
  }
}
