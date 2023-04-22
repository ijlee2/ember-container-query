import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { ContainerQuery, height, width } from 'ember-container-query';

import styles from './memo.css';
import WidgetsWidget4MemoActions from './memo/actions';
import WidgetsWidget4MemoBody from './memo/body';
import WidgetsWidget4MemoHeader from './memo/header';

interface WidgetsWidget4MemoSignature {}

export default class WidgetsWidget4MemoComponent extends Component<WidgetsWidget4MemoSignature> {
  styles = styles;

  <template>
    <ContainerQuery
      @features={{hash
        small=(width max=200)
        large=(width min=200)
        short=(height max=200)
      }}
      @tagName="article"
      class={{this.styles.container}}
      as |CQ|
    >
      <div class={{this.styles.header-container}}>
        <WidgetsWidget4MemoHeader
          @cqFeatures={{CQ.features}}
        />
      </div>

      <div class={{this.styles.body-container}}>
        <WidgetsWidget4MemoBody
          @cqFeatures={{CQ.features}}
        />
      </div>

      <div class={{this.styles.actions-container}}>
        <WidgetsWidget4MemoActions
          @cqFeatures={{CQ.features}}
        />
      </div>
    </ContainerQuery>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4MemoComponent;
  }
}
