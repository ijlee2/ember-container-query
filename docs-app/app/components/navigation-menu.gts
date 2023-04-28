import type { TOC } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

import styles from './navigation-menu.css';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

const NavigationMenuComponent: TOC<NavigationMenuSignature> =
  <template>
    <nav aria-label={{@name}} data-test-nav={{@name}}>
      <ul class={{styles.list}}>
        {{#each @menuItems as |menuItem|}}
          <li>
            <LinkTo
              @route={{menuItem.route}}
              class={{styles.link}}
              data-test-link={{menuItem.label}}
            >
              {{menuItem.label}}
            </LinkTo>
          </li>
        {{/each}}
      </ul>
    </nav>
  </template>

export default NavigationMenuComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    NavigationMenu: typeof NavigationMenuComponent;
  }
}
