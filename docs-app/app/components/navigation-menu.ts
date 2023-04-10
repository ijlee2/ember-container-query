import Component from '@glimmer/component';

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

export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    NavigationMenu: typeof NavigationMenuComponent;
  }
}
