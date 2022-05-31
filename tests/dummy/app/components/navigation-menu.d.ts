type MenuItem = {
  label: string;
  route: string;
};

export interface NavigationMenuComponentArgs {
  menuItems: Array<MenuItem>;
  name?: string;
}
