import templateOnlyComponent from '@ember/component/template-only';

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

const NavigationMenuComponent =
  templateOnlyComponent<NavigationMenuSignature>();

export default NavigationMenuComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    NavigationMenu: typeof NavigationMenuComponent;
  }
}
