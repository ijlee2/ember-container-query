import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { aspectRatio, ContainerQuery } from 'ember-container-query';

import styles from './widget-1.css';
import WidgetsWidget1Item from './widget-1/item';

interface WidgetsWidget1Signature {}

export default class WidgetsWidget1Component extends Component<WidgetsWidget1Signature> {
  styles = styles;

  <template>
    <ContainerQuery
      @features={{hash
        tall=(aspectRatio max=0.8)
        square=(aspectRatio min=0.8 max=1.25)
        wide=(aspectRatio min=1.25)
      }}
      @tagName="section"
      class={{this.styles.container}}
    >
      <header>
        <h2>Widget 1</h2>
      </header>

      <div class={{this.styles.items}}>
        <div class={{this.styles.item-1}}>
          <WidgetsWidget1Item @title="Item 1" />
        </div>

        <div class={{this.styles.item-2}}>
          <WidgetsWidget1Item @title="Item 2" />
        </div>

        <div class={{this.styles.item-3}}>
          <WidgetsWidget1Item @title="Item 3" />
        </div>
      </div>
    </ContainerQuery>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1': typeof WidgetsWidget1Component;
  }
}
  