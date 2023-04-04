import templateOnlyComponent from '@ember/component/template-only';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuComponentSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

const NavigationMenuComponent =
  templateOnlyComponent<NavigationMenuComponentSignature>();

export default NavigationMenuComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    NavigationMenu: typeof NavigationMenuComponent;
  }
}
