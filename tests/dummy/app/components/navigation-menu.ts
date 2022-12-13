import templateOnlyComponent from '@ember/component/template-only';

type MenuItem = {
  label: string;
  route: string;
};

export interface NavigationMenuComponentSignature {
  Args: {
    menuItems: Array<MenuItem>;
    name?: string;
  };
  Element: HTMLElement;
}

const NavigationMenuComponent =
  templateOnlyComponent<NavigationMenuComponentSignature>();

export default NavigationMenuComponent;
