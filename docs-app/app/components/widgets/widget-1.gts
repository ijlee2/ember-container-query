import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { aspectRatio, ContainerQuery } from 'ember-container-query';

import styles from './widget-1.css';
import WidgetsWidget1Item from './widget-1/item';

interface WidgetsWidget1Signature {}

const WidgetsWidget1Component: TOC<WidgetsWidget1Signature> =
  <template>
    <ContainerQuery
      @features={{hash
        tall=(aspectRatio max=0.8)
        square=(aspectRatio min=0.8 max=1.25)
        wide=(aspectRatio min=1.25)
      }}
      @tagName="section"
      class={{styles.container}}
    >
      <header>
        <h2>Widget 1</h2>
      </header>

      <div class={{styles.items}}>
        <div class={{styles.item-1}}>
          <WidgetsWidget1Item @title="Item 1" />
        </div>

        <div class={{styles.item-2}}>
          <WidgetsWidget1Item @title="Item 2" />
        </div>

        <div class={{styles.item-3}}>
          <WidgetsWidget1Item @title="Item 3" />
        </div>
      </div>
    </ContainerQuery>
  </template>

export default WidgetsWidget1Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1': typeof WidgetsWidget1Component;
  }
}
