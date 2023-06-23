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
        class={{localClass
          styles
          "header"
          (if showMinimalLayout "minimal-layout")
          (if showHorizontalLayout "horizontal-layout")
        }}
        data-test-memo-header
      >
        {{#unless showMinimalLayout}}
          <div class={{styles.avatar-container}}>
            {{! template-lint-disable no-redundant-role }}
            <img
              alt=""
              class={{styles.avatar}}
              data-test-image="Avatar"
              role="presentation"
              src="/images/widgets/widget-4/avatar.jpg"
            />
            {{! template-lint-enable no-redundant-role }}
          </div>
        {{/unless}}

        <p class={{styles.name}}>
          Isaac Lee
        </p>

        <div class={{styles.metadata}}>
          <a class={{styles.handle}} href="#">@ijlee2</a>
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
