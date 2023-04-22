import type { TOC } from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';
import { localClass } from 'embroider-css-modules';

import strictAnd from '../../../../helpers/strict-and';
import strictOr from '../../../../helpers/strict-or';
import styles from './header.css';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoHeaderComponent: TOC<WidgetsWidget4MemoHeaderSignature> =
  <template>
    {{#let
      (strictAnd @cqFeatures.large @cqFeatures.short)
      (strictOr @cqFeatures.small @cqFeatures.short)
      as |showHorizontalLayout showMinimalLayout|
    }}
      <div
        data-test-memo-header
        class={{localClass
          styles
          "header"
          (if showMinimalLayout "minimal-layout")
          (if showHorizontalLayout "horizontal-layout")
        }}
      >
        {{#unless showMinimalLayout}}
          <div class={{styles.avatar-container}}>
            <img
              alt=""
              data-test-image="Avatar"
              class={{styles.avatar}}
              role="presentation"
              src="/images/widgets/widget-4/avatar.jpg"
            />
          </div>
        {{/unless}}

        <p class={{styles.name}}>
          Isaac Lee
        </p>

        <div class={{styles.metadata}}>
          <a href="#" class={{styles.handle}}>@ijlee2</a>
          · 38m
        </div>
      </div>
    {{/let}}
  </template>

export default WidgetsWidget4MemoHeaderComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
