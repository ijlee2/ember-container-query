import Component from '@glimmer/component';
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

export default class WidgetsWidget4MemoHeaderComponent extends Component<WidgetsWidget4MemoHeaderSignature> {
  styles = styles;

  <template>
    {{#let
      (strictAnd @cqFeatures.large @cqFeatures.short)
      (strictOr @cqFeatures.small @cqFeatures.short)
      as |showHorizontalLayout showMinimalLayout|
    }}
      <div
        data-test-memo-header
        class={{localClass
          this.styles
          "header"
          (if showMinimalLayout "minimal-layout")
          (if showHorizontalLayout "horizontal-layout")
        }}
      >
        {{#unless showMinimalLayout}}
          <div class={{this.styles.avatar-container}}>
            <img
              alt=""
              data-test-image="Avatar"
              class={{this.styles.avatar}}
              role="presentation"
              src="/images/widgets/widget-4/avatar.jpg"
            />
          </div>
        {{/unless}}

        <p class={{this.styles.name}}>
          Isaac Lee
        </p>

        <div class={{this.styles.metadata}}>
          <a href="#" class={{this.styles.handle}}>@ijlee2</a>
          · 38m
        </div>
      </div>
    {{/let}}
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
